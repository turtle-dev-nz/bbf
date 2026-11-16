import { useCallback, useLayoutEffect, useRef } from "react";

const EASE = "cubic-bezier(0.2, 0.9, 0.25, 1)";

/**
 * Minimal FLIP for a short list: when keys change, existing rows glide to their new position and
 * new rows slide in from above with a brief highlight. Nothing animates on the first populated render.
 * Positions are measured relative to the list, so page scrolling between updates doesn't matter.
 */
export function useFlipList<L extends HTMLElement, I extends HTMLElement>(keys: string[], disabled: boolean) {
  const listRef = useRef<L>(null);
  const itemEls = useRef(new Map<string, I>());
  const offsets = useRef(new Map<string, number>());
  const populated = useRef(false);
  const signature = keys.join("\n");

  const itemRef = useCallback(
    (key: string) => (el: I | null) => {
      if (el) itemEls.current.set(key, el);
      else itemEls.current.delete(key);
    },
    [],
  );

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const listTop = list.getBoundingClientRect().top;
    const prev = offsets.current;
    const next = new Map<string, number>();
    const animate = populated.current && !disabled;

    for (const key of signature ? signature.split("\n") : []) {
      const el = itemEls.current.get(key);
      if (!el) continue;
      const top = el.getBoundingClientRect().top - listTop;
      next.set(key, top);

      if (!animate) continue;
      const before = prev.get(key);
      if (before === undefined) {
        el.animate(
          [
            { opacity: 0, transform: "translateY(-14px)", backgroundColor: "rgba(243, 165, 124, 0.35)" },
            { opacity: 1, transform: "none", backgroundColor: "rgba(243, 165, 124, 0.35)", offset: 0.4 },
            { opacity: 1, transform: "none", backgroundColor: "rgba(243, 165, 124, 0)" },
          ],
          { duration: 1400, easing: EASE },
        );
      } else if (before !== top) {
        el.animate([{ transform: `translateY(${before - top}px)` }, { transform: "none" }], {
          duration: 500,
          easing: EASE,
        });
      }
    }

    offsets.current = next;
    if (next.size > 0) populated.current = true;
  }, [signature, disabled]);

  return { listRef, itemRef };
}
