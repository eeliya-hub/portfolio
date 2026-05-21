import { useEffect, useState } from 'react';

export function useTypewriter(text, speed = 80, startDelay = 300) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) {
      const emptyId = window.setTimeout(() => {
        setDisplayed('');
        setDone(true);
      }, 0);
      return () => window.clearTimeout(emptyId);
    }

    let cancelled = false;
    let resetTimeout;
    let startTimeout;
    let tickTimeout;
    let frameId;

    const shouldShortCircuit = typeof window !== 'undefined'
      && (
        window.innerWidth < 768
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );

    if (shouldShortCircuit) {
      frameId = window.requestAnimationFrame(() => {
        if (cancelled) return;
        setDisplayed(text);
        setDone(true);
      });

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frameId);
      };
    }

    resetTimeout = window.setTimeout(() => {
      if (cancelled) return;

      setDisplayed('');
      setDone(false);

      let index = 0;
      const step = text.length > 60 ? 3 : text.length > 28 ? 2 : 1;
      const cadence = Math.max(24, Math.floor(speed * 0.82));

      const tick = () => {
        if (cancelled) return;

        index = Math.min(text.length, index + step);
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          setDone(true);
          return;
        }

        tickTimeout = window.setTimeout(tick, cadence);
      };

      startTimeout = window.setTimeout(tick, startDelay);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(resetTimeout);
      window.clearTimeout(startTimeout);
      window.clearTimeout(tickTimeout);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
