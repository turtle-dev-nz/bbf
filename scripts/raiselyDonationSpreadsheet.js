const SPREADSHEET_ID = "1iGrus5Yr7EMd9SqAMZKvZjOBIRC92vryCbwMu1St42c";
const SHEET_NAME = "DonationList";
const ERROR_SHEET_NAME = "ErrorLog";

const WEBHOOK_SECRET = "e1c9a5d076bf8243-76c3412aef8d059b";
const TOTAL_PROPERTY = "TOTAL_CENTS";

/**
 * GET
 *
 * Returns the current donation total.
 *
 * This is deliberately very lightweight.
 * It does NOT access Raisely or scan the spreadsheet.
 */
function doGet(e) {
  const properties = PropertiesService.getScriptProperties();

  const totalCents = Number(properties.getProperty(TOTAL_PROPERTY) || 0);

  return jsonResponse({
    success: true,
    total: totalCents / 100,
  });
}

/**
 * POST
 *
 * Receives a Raisely webhook.
 *
 * Validation/business-logic outcomes (bad secret, malformed payload,
 * ignored event types, invalid amounts) return HTTP 200 - retrying
 * would produce the same result.
 *
 * Anything thrown from the critical section below (lock, Sheets API)
 * is left uncaught so Apps Script returns a 5xx, which makes Raisely
 * retry the delivery.
 */
function doPost(e) {
  const logCollector = createLogCollector();
  let eventUuid = null;
  let donationUuid = null;

  try {
    // ------------------------------------------------
    // 1. Parse the webhook
    // ------------------------------------------------

    if (!e || !e.postData || !e.postData.contents) {
      logCollector.log("doPost: no POST body received");
      return jsonResponse({
        success: false,
        error: "No POST body received",
      });
    }

    logCollector.log("doPost: raw payload: " + e.postData.contents);

    let payload;

    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      logCollector.error("doPost: malformed JSON body: " + parseError);
      return jsonResponse({
        success: false,
        error: "Malformed JSON body",
      });
    }

    // ------------------------------------------------
    // 2. Validate webhook secret
    // ------------------------------------------------

    if (payload.secret !== WEBHOOK_SECRET) {
      logCollector.error("doPost: secret mismatch. Received: " + payload.secret);
      return jsonResponse({
        success: false,
        error: "Invalid webhook secret",
      });
    }

    // ------------------------------------------------
    // 3. Extract event information
    // ------------------------------------------------

    const event = payload.data;

    if (!event) {
      logCollector.error("doPost: invalid Raisely payload, missing data");
      return jsonResponse({
        success: false,
        error: "Invalid Raisely payload",
      });
    }

    const eventType = event.type;
    eventUuid = event.uuid;

    const donation = event.data;

    if (!donation) {
      logCollector.error("doPost: no donation data found");
      return jsonResponse({
        success: false,
        error: "No donation data found",
      });
    }

    donationUuid = donation.uuid;

    logCollector.log(
      "doPost: eventUuid=" +
        eventUuid +
        " eventType=" +
        eventType +
        " mode=" +
        donation.mode +
        " amount=" +
        donation.amount +
        " donationUuid=" +
        donationUuid,
    );

    // ------------------------------------------------
    // 4. We only process events that affect the total
    // ------------------------------------------------

    if (PROCESSED_EVENT_TYPES.indexOf(eventType) === -1) {
      logCollector.log("doPost: ignoring, eventType is not processed");
      return jsonResponse({
        success: true,
        ignored: true,
        reason: "Event type not processed",
        eventType: eventType,
      });
    }

    // ------------------------------------------------
    // 5. Only process LIVE donations
    // ------------------------------------------------

    if (donation.mode !== "LIVE") {
      logCollector.log("doPost: ignoring, donation.mode is " + donation.mode + " (not LIVE)");
      return jsonResponse({
        success: true,
        ignored: true,
        reason: "Non-live donation",
      });
    }

    // ------------------------------------------------
    // 6. Validate amounts
    // ------------------------------------------------

    const amountCents = Number(donation.amount);

    if (!Number.isInteger(amountCents) || amountCents < 0) {
      logCollector.error("doPost: invalid amount: " + donation.amount);
      return jsonResponse({
        success: false,
        error: "Invalid donation amount",
      });
    }

    let amountRefundedCents = 0;

    if (eventType === "donation.refunded") {
      amountRefundedCents = Number(donation.amountRefunded);

      if (!Number.isInteger(amountRefundedCents) || amountRefundedCents < 0) {
        logCollector.error("doPost: invalid amountRefunded: " + donation.amountRefunded);
        return jsonResponse({
          success: false,
          error: "Invalid donation amountRefunded",
        });
      }
    }

    // ------------------------------------------------
    // 7. Critical section - acquire a lock
    // ------------------------------------------------

    const lock = LockService.getScriptLock();

    // Throws (and is left uncaught) if the lock isn't free within 10s,
    // surfacing as a 5xx so Raisely retries the delivery.
    lock.waitLock(10000);

    try {
      const sheet = getSheet();

      // ------------------------------------------------
      // 8. Check for duplicate webhook
      // ------------------------------------------------

      if (eventAlreadyProcessed(sheet, eventUuid)) {
        logCollector.log("doPost: duplicate event, already processed: " + eventUuid);
        return jsonResponse({
          success: true,
          duplicate: true,
          eventUuid: eventUuid,
        });
      }

      // ------------------------------------------------
      // 9. Work out this event's effect on the total
      // ------------------------------------------------

      const deltaCents = computeDelta(sheet, eventType, donationUuid, amountCents, amountRefundedCents, logCollector);

      // ------------------------------------------------
      // 10. Update and save the running total
      // ------------------------------------------------

      const properties = PropertiesService.getScriptProperties();

      const totalCents = Number(properties.getProperty(TOTAL_PROPERTY) || 0) + deltaCents;

      properties.setProperty(TOTAL_PROPERTY, String(totalCents));

      // ------------------------------------------------
      // 11. Record the event (append-only, non-destructive)
      // ------------------------------------------------

      sheet.appendRow([eventUuid, donationUuid, eventType, deltaCents, totalCents, new Date()]);

      // ------------------------------------------------
      // 12. Done
      // ------------------------------------------------

      logCollector.log(
        "doPost: applied " + eventType + " for " + donationUuid + " delta=" + deltaCents + " newTotal=" + totalCents,
      );

      return jsonResponse({
        success: true,
        applied: true,
        eventUuid: eventUuid,
        donationUuid: donationUuid,
        eventType: eventType,
        delta: deltaCents / 100,
        total: totalCents / 100,
      });
    } catch (error) {
      // Log for visibility, then rethrow so Apps Script returns a 5xx
      // and Raisely retries - this is a Sheets/Properties failure, not
      // a bad payload, so retrying can succeed.
      logCollector.error(
        "doPost: critical section failure (will retry): " + error + (error && error.stack ? "\n" + error.stack : ""),
      );
      throw error;
    } finally {
      // ALWAYS release the lock
      lock.releaseLock();
    }
  } finally {
    // Single consolidated write per execution, win or lose.
    flushLogToSheet(logCollector, eventUuid, donationUuid);
  }
}

function initializeTotal() {
  const sheet = getSheet();

  const values = sheet.getDataRange().getValues();

  // Column D (index 3) is DeltaCents; summing it replays the same
  // add/subtract logic doPost applies for succeeded/refunded/deleted.
  let totalCents = 0;

  for (let i = 1; i < values.length; i++) {
    const delta = Number(values[i][3]);

    if (!isNaN(delta)) {
      totalCents += delta;
    }
  }

  PropertiesService.getScriptProperties().setProperty(TOTAL_PROPERTY, String(totalCents));

  console.log(`Initialized total: ${totalCents} cents`);
}

/**
 * Returns the Google Sheet.
 */
function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  return spreadsheet.getSheetByName(SHEET_NAME);
}

/**
 * Collects log lines for a single execution so they can be written to
 * the ErrorLog sheet as one row at the end, instead of one write per
 * message. Still mirrors everything to console.* for local debugging.
 */
function createLogCollector() {
  const entries = [];
  let level = "OK";

  return {
    log: function (message) {
      console.log(message);
      entries.push("INFO: " + message);
    },
    warn: function (message) {
      console.warn(message);
      entries.push("WARN: " + message);
      if (level !== "ERROR") {
        level = "WARN";
      }
    },
    error: function (message) {
      console.error(message);
      entries.push("ERROR: " + message);
      level = "ERROR";
    },
    getLevel: function () {
      return level;
    },
    getTranscript: function () {
      return entries.join("\n");
    },
  };
}

/**
 * Writes one execution's collected log to a dedicated sheet tab
 * (creating it if needed), so everything is visible in the spreadsheet
 * without relying on the Executions log UI, which doesn't reliably
 * expand for externally-triggered Web App runs.
 * Never throws - a logging failure must not mask the original error.
 */
function flushLogToSheet(logCollector, eventUuid, donationUuid) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(ERROR_SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(ERROR_SHEET_NAME);
      sheet.appendRow(["Timestamp", "Level", "EventUUID", "DonationUUID", "Log"]);
    }

    sheet.appendRow([
      new Date(),
      logCollector.getLevel(),
      eventUuid || "",
      donationUuid || "",
      logCollector.getTranscript(),
    ]);
  } catch (loggingError) {
    console.error("flushLogToSheet: failed to write log: " + loggingError);
  }
}

/**
 * Checks whether a webhook event has already
 * been processed.
 */
function eventAlreadyProcessed(sheet, eventUuid) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return false;
  }

  const eventUuids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let i = 0; i < eventUuids.length; i++) {
    if (String(eventUuids[i][0]) === String(eventUuid)) {
      return true;
    }
  }

  return false;
}

/**
 * Works out how much a single event should change the running total by,
 * based on what's already been recorded for that donation. This makes
 * processing self-correcting and idempotent without ever editing past rows:
 * - donation.succeeded: adds the full donation amount (once).
 * - donation.refunded: subtracts only the newly-refunded portion, since
 *   amountRefunded is cumulative and multiple refund events can fire.
 * - donation.deleted: reverses whatever net amount is currently applied.
 */
function computeDelta(sheet, eventType, donationUuid, amountCents, amountRefundedCents, logger) {
  const history = getDonationHistory(sheet, donationUuid);

  logger.log(
    "computeDelta: donation " +
      donationUuid +
      " history: netDelta=" +
      history.netDelta +
      " refundAppliedCents=" +
      history.refundAppliedCents,
  );

  if (eventType === "donation.succeeded") {
    if (history.netDelta !== 0) {
      logger.log("computeDelta: donation " + donationUuid + " already counted, skipping");
      return 0;
    }
    return amountCents;
  }

  if (eventType === "donation.refunded") {
    const incremental = amountRefundedCents - history.refundAppliedCents;

    if (incremental <= 0) {
      logger.log("computeDelta: no new refund amount for donation " + donationUuid);
      return 0;
    }

    // Never refund more than this donation actually contributed - if it
    // does, the original donation.succeeded was likely never recorded.
    const remainingNet = Math.max(history.netDelta, 0);

    if (incremental > remainingNet) {
      logger.warn(
        "computeDelta: refund for donation " +
          donationUuid +
          " (" +
          incremental +
          " cents) exceeds its recorded net (" +
          remainingNet +
          " cents) - its donation.succeeded may be missing. Capping refund to remaining net.",
      );
      return remainingNet === 0 ? 0 : -remainingNet;
    }

    return -incremental;
  }

  if (eventType === "donation.deleted") {
    if (history.netDelta === 0) {
      logger.log("computeDelta: donation " + donationUuid + " had no net contribution to reverse");
      return 0;
    }
    return -history.netDelta;
  }

  return 0;
}

/**
 * Sums the DeltaCents already recorded for a donation, split out by
 * how much of that came from refund events specifically.
 */
function getDonationHistory(sheet, donationUuid) {
  const lastRow = sheet.getLastRow();

  let netDelta = 0;
  let refundAppliedCents = 0;

  if (lastRow < 2) {
    return { netDelta: netDelta, refundAppliedCents: refundAppliedCents };
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, 4).getValues();

  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][1]) !== String(donationUuid)) {
      continue;
    }

    const rowEventType = rows[i][2];
    const rowDelta = Number(rows[i][3]) || 0;

    netDelta += rowDelta;

    if (rowEventType === "donation.refunded") {
      refundAppliedCents += -rowDelta;
    }
  }

  return { netDelta: netDelta, refundAppliedCents: refundAppliedCents };
}

/**
 * Creates a JSON response.
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
