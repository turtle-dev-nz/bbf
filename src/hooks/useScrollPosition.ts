import { useState, useEffect } from "react";

export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState<number>(() => (typeof window === "undefined" ? 0 : window.scrollY));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    // Sync once on mount so restored scroll positions do not lag until first scroll event.
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
