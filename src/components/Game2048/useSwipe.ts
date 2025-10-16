import { useEffect } from "react";

export default function useSwipe(
  onSwipe: (dir: "up" | "down" | "left" | "right") => void
) {
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let touching = false;

    function onTouchStart(e: TouchEvent) {
      touching = true;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (!touching) return;
      e.preventDefault();
    }

    function onTouchEnd(e: TouchEvent) {
      if (!touching) return;
      touching = false;
      const t = (e.changedTouches && e.changedTouches[0]) || ({} as Touch);
      const dx = (t.clientX || 0) - startX;
      const dy = (t.clientY || 0) - startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 20;
      if (Math.max(absX, absY) < threshold) return;
      if (absX > absY) onSwipe(dx > 0 ? "right" : "left");
      else onSwipe(dy > 0 ? "down" : "up");
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onSwipe]);
}