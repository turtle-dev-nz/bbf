/**
 * Contact-form forwarder for bigbrainfoundation.org (Google Apps Script web app).
 *
 * The site's contact modals POST JSON here (as text/plain, so the browser skips the CORS preflight).
 * Each valid message is emailed to FORWARD_TO from the account that owns this script, with Reply-To
 * set to the sender, and logged to a sheet.
 *
 * Setup
 *  1. Create a new Apps Script project under the account that should send the emails.
 *  2. Paste this file in. Project Settings > Script properties:
 *       FORWARD_TO       hello@bigbrainfoundation.org (comma-separate for several)
 *       LOG_SPREADSHEET  (optional) ID of a Google Sheet to log submissions to
 *  3. Deploy > New deployment > Web app: Execute as "Me", access "Anyone".
 *  4. Put the /exec URL in VITE_CONTACT_FORM_URL and rebuild the site.
 */

const MAX_LENGTHS = { name: 120, email: 200, location: 120, message: 3000, topic: 40, page: 200 };
const RATE_LIMIT_SECONDS = 60;
const ALLOWED_TOPICS = ["General", "Question", "Run with Sam", "Help the crew", "Sponsorship", "Media"];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json({ success: false, error: "Empty request" });

    let body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      return json({ success: false, error: "Malformed request" });
    }

    // Honeypot filled in: pretend success so bots don't retry.
    if (body.website) return json({ success: true });

    const data = {};
    for (const key in MAX_LENGTHS) {
      data[key] = String(body[key] || "")
        .trim()
        .slice(0, MAX_LENGTHS[key]);
    }

    if (!data.name || !data.message) return json({ success: false, error: "Name and message are required" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ success: false, error: "Invalid email" });
    if (ALLOWED_TOPICS.indexOf(data.topic) === -1) data.topic = "General";

    // One message per email address per minute.
    const cache = CacheService.getScriptCache();
    const rateKey = "rl:" + data.email.toLowerCase();
    if (cache.get(rateKey)) return json({ success: false, error: "Please wait a minute before sending again" });
    cache.put(rateKey, "1", RATE_LIMIT_SECONDS);

    const props = PropertiesService.getScriptProperties();
    const forwardTo = props.getProperty("FORWARD_TO");
    if (!forwardTo) throw new Error("FORWARD_TO script property is not set");

    const lines = [
      "Topic: " + data.topic,
      "Name: " + data.name,
      "Email: " + data.email,
      data.location ? "Location: " + data.location : null,
      "Page: " + data.page,
      "",
      data.message,
    ].filter(function (line) {
      return line !== null;
    });

    MailApp.sendEmail({
      to: forwardTo,
      replyTo: data.email,
      name: "Sam's Big Brain Run website",
      subject: "[" + data.topic + "] " + data.name + " via bigbrainfoundation.org",
      body: lines.join("\n"),
    });

    logSubmission(props.getProperty("LOG_SPREADSHEET"), data);

    return json({ success: true });
  } catch (err) {
    console.error("contactForm: " + err + (err && err.stack ? "\n" + err.stack : ""));
    return json({ success: false, error: "Could not send message" });
  }
}

function logSubmission(spreadsheetId, data) {
  if (!spreadsheetId) return;
  try {
    const ss = SpreadsheetApp.openById(spreadsheetId);
    let sheet = ss.getSheetByName("Contact");
    if (!sheet) {
      sheet = ss.insertSheet("Contact");
      sheet.appendRow(["Timestamp", "Topic", "Name", "Email", "Location", "Page", "Message"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), data.topic, data.name, data.email, data.location, data.page, data.message]);
  } catch (err) {
    // Logging must never block the email.
    console.error("contactForm: failed to log submission: " + err);
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
