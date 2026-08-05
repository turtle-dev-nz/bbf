import { useEffect, useRef, useCallback } from "react";
import nzmapUrl from "../../assets/nzmap.png";
import "./NZMapUnderlay.css";

// ─────────────────────────────────────────────────────────────────────────────
// Normalised [x, y] waypoints (0–1 relative to viewport) that trace NZ's
// approximate spine from north (top) to south (bottom) after the image has
// been rotated 90° counter-clockwise into its correct portrait orientation.
//
// x = 0 → left viewport edge   x = 1 → right viewport edge
// y = 0 → top viewport edge    y = 1 → bottom viewport edge
//
// Adjust these if the dot drifts off the map outline once you can see the
// image rendered in the browser.
// ─────────────────────────────────────────────────────────────────────────────
const NZ_PATH: [number, number][] = [
  [0.88, 0.05], // cape rianga
  [0.7, 0.26],
  [0.67, 0.34],
  [0.6, 0.36],
  [0.58, 0.4],
  [0.55, 0.42],
  [0.46, 0.4],
  [0.42, 0.43],
  [0.37, 0.52],
  [0.35, 0.52],
  [0.32, 0.55],
  [0.28, 0.5],
  [0.25, 0.42],
  [0.2, 0.46],
  [0.15, 0.44],
  [0.1, 0.35], // wellignton
];

// ─────────────────────────────────────────────────────────────────────────────
// Accent colours matching --color-accent and --color-accent-light
// ─────────────────────────────────────────────────────────────────────────────
const TRAIL_HEX = "#ca831971";
const DOT_HEX = "#d17600a6";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

type ParsedHexColor = {
  rgb: string;
  alpha: number;
};

function parseHexColor(hex: string): ParsedHexColor {
  const trimmed = hex.trim().replace(/^#/, "");
  const normalized =
    trimmed.length === 3 || trimmed.length === 4
      ? trimmed
          .split("")
          .map((ch) => `${ch}${ch}`)
          .join("")
      : trimmed;

  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(normalized)) {
    return { rgb: "0, 0, 0", alpha: 1 };
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  const a = normalized.length === 8 ? Number.parseInt(normalized.slice(6, 8), 16) / 255 : 1;

  return {
    rgb: `${r}, ${g}, ${b}`,
    alpha: a,
  };
}

const TRAIL_COLOR = parseHexColor(TRAIL_HEX);
const DOT_COLOR = parseHexColor(DOT_HEX);

/** Sample a normalised [x, y] position along the path at progress t ∈ [0, 1]. */
function samplePath(path: [number, number][], t: number): [number, number] {
  if (t <= 0) return path[0];
  if (t >= 1) return path[path.length - 1];
  const raw = t * (path.length - 1);
  const i = Math.floor(raw);
  const f = raw - i;
  const a = path[Math.min(i, path.length - 1)];
  const b = path[Math.min(i + 1, path.length - 1)];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NZMapUnderlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageSizeRef = useRef({ width: 1, height: 1 });
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);

  const getBackgroundImageRect = useCallback((imageEl: HTMLDivElement) => {
    const mapWidth = imageEl.clientWidth;
    const mapHeight = imageEl.clientHeight;
    const imgWidth = imageSizeRef.current.width;
    const imgHeight = imageSizeRef.current.height;

    if (mapWidth <= 0 || mapHeight <= 0 || imgWidth <= 0 || imgHeight <= 0) {
      return { left: 0, top: 0, width: mapWidth, height: mapHeight };
    }

    const style = window.getComputedStyle(imageEl);
    const sizeValue = style.backgroundSize.trim();
    let drawWidth = mapWidth;
    let drawHeight = mapHeight;

    if (sizeValue === "cover") {
      const scale = Math.max(mapWidth / imgWidth, mapHeight / imgHeight);
      drawWidth = imgWidth * scale;
      drawHeight = imgHeight * scale;
    } else if (sizeValue === "contain") {
      const scale = Math.min(mapWidth / imgWidth, mapHeight / imgHeight);
      drawWidth = imgWidth * scale;
      drawHeight = imgHeight * scale;
    }

    const [xPosRaw = "50%", yPosRaw = "50%"] = style.backgroundPosition.split(" ");
    const toFactor = (value: string) => {
      const v = value.trim().toLowerCase();
      if (v === "left" || v === "top") return 0;
      if (v === "center") return 0.5;
      if (v === "right" || v === "bottom") return 1;
      if (v.endsWith("%")) return Number.parseFloat(v) / 100;
      return 0.5;
    };

    const xFactor = toFactor(xPosRaw);
    const yFactor = toFactor(yPosRaw);
    const left = (mapWidth - drawWidth) * xFactor;
    const top = (mapHeight - drawHeight) * yFactor;

    return { left, top, width: drawWidth, height: drawHeight };
  }, []);

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const mapEl = mapRef.current;
    if (!canvas || !mapEl) return;

    const width = mapEl.clientWidth;
    const height = mapEl.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }, []);

  const render = useCallback(
    (canvas: HTMLCanvasElement, progress: number) => {
      const ctx = canvas.getContext("2d");
      const mapEl = mapRef.current;
      const imageEl = imageRef.current;
      if (!ctx || !mapEl || !imageEl) return;

      const mapWidth = mapEl.clientWidth;
      const mapHeight = mapEl.clientHeight;
      const imageRect = getBackgroundImageRect(imageEl);
      const dpr = window.devicePixelRatio || 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, mapWidth, mapHeight);

      if (progress <= 0.002) return;

      // ── Trail ───────────────────────────────────────────────────────────────
      // Subdivide the path into fine steps; segments near the dot are bright
      // while older segments fade toward transparent.
      const STEPS = 300;
      const drawSteps = Math.ceil(progress * STEPS);

      for (let i = 1; i <= drawSteps; i++) {
        const t0 = (i - 1) / STEPS;
        const t1 = i / STEPS;
        const [x0, y0] = samplePath(NZ_PATH, t0);
        const [x1, y1] = samplePath(NZ_PATH, t1);

        // 0 = oldest (near start), 1 = newest (near dot)
        const freshness = (i - 1) / drawSteps;
        const alpha = Math.max(0, freshness * 0.7) * TRAIL_COLOR.alpha;

        ctx.beginPath();
        ctx.moveTo(imageRect.left + x0 * imageRect.width, imageRect.top + y0 * imageRect.height);
        ctx.lineTo(imageRect.left + x1 * imageRect.width, imageRect.top + y1 * imageRect.height);
        ctx.strokeStyle = `rgba(${TRAIL_COLOR.rgb}, ${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // ── Dot ─────────────────────────────────────────────────────────────────
      const [dx, dy] = samplePath(NZ_PATH, progress);
      const px = imageRect.left + dx * imageRect.width;
      const py = imageRect.top + dy * imageRect.height;

      // Outer glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, 18);
      glow.addColorStop(0, `rgba(${DOT_COLOR.rgb}, ${0.45 * DOT_COLOR.alpha})`);
      glow.addColorStop(1, `rgba(${DOT_COLOR.rgb}, 0)`);
      ctx.beginPath();
      ctx.arc(px, py, 18, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Mid ring
      const ring = ctx.createRadialGradient(px, py, 0, px, py, 7);
      ring.addColorStop(0, `rgba(${DOT_COLOR.rgb}, ${0.9 * DOT_COLOR.alpha})`);
      ring.addColorStop(1, `rgba(${DOT_COLOR.rgb}, ${0.3 * DOT_COLOR.alpha})`);
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = ring;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
      ctx.fill();
    },
    [getBackgroundImageRect],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = nzmapUrl;
    img.onload = () => {
      imageSizeRef.current = {
        width: img.naturalWidth || 1,
        height: img.naturalHeight || 1,
      };
      syncCanvasSize();
      render(canvas, progressRef.current);
    };

    // Sync canvas pixel dimensions to viewport on mount and resize
    const resize = () => {
      syncCanvasSize();
      render(canvas, progressRef.current);
    };
    resize();
    window.addEventListener("resize", resize);

    // Update progress on scroll using rAF batching
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => render(canvas, progressRef.current));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [render, syncCanvasSize]);

  return (
    <div className="nzmap-underlay" aria-hidden="true">
      {/* Map image layer — transformed in CSS; canvas is drawn in this same local space. */}
      <div ref={mapRef} className="nzmap-underlay__map" role="presentation">
        <div ref={imageRef} className="nzmap-underlay__image" style={{ backgroundImage: `url(${nzmapUrl})` }} />
        {/* Trail canvas — aligns to the rendered background image rect within the map layer. */}
        <canvas ref={canvasRef} className="nzmap-underlay__canvas" />
      </div>
    </div>
  );
}
