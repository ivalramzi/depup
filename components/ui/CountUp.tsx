"use client";

import * as React from "react";

/** Angka naik halus dari nilai sebelumnya ke nilai baru (±550ms). Tanpa animasi jika reduced motion. */
export function CountUp({ value, duration = 550 }: { value: number | string; duration?: number }) {
  const target = typeof value === "number" ? value : Number.NaN;
  const [shown, setShown] = React.useState<number>(Number.isNaN(target) ? 0 : 0);
  const from = React.useRef(0);

  React.useEffect(() => {
    if (Number.isNaN(target)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || target === from.current) {
      from.current = target;
      setShown(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(a + (target - a) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{Number.isNaN(target) ? value : shown}</>;
}
