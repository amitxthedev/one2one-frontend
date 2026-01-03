import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function NewYearEffect() {
  useEffect(() => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        spread: 80,
        origin: { y: 0.6 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return null;
}
