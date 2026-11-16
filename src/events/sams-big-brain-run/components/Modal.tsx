import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import "./Modal.css";

type ModalVariant = "dialog" | "sheet";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** "dialog": centred card. "sheet": full screen on phones, tall centred panel on desktop. */
  variant?: ModalVariant;
  /** Remove body padding, e.g. for an iframe that should fill the panel. */
  flush?: boolean;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

// Shared across modals so stacked/consecutive modals don't fight over body scroll.
let openCount = 0;

/**
 * Accessible modal shell: portal, Esc to close, click-outside, focus trap,
 * focus restore and body scroll lock.
 */
export function Modal({ isOpen, onClose, title, variant = "dialog", flush = false, children }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    openCount += 1;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openCount -= 1;
      if (openCount === 0) document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`bbr-modal-backdrop bbr-modal-backdrop--${variant}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={`bbr-modal-panel bbr-modal-panel--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="bbr-modal-head">
          <h2 id={titleId} className="bbr-modal-heading">
            {title}
          </h2>
          <button className="bbr-modal-x" type="button" onClick={onClose} aria-label="Close">
            <FiX size={20} aria-hidden="true" />
          </button>
        </div>
        <div className={`bbr-modal-content${flush ? " bbr-modal-content--flush" : ""}`}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
