import { useEffect, useState } from "react";
import { useCelebration } from "../../context/CelebrationContext";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function CelebrationLayer() {
  const { active, type, setActive } = useCelebration();
  const { width, height } = useWindowSize();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) return;

    setShow(true);

    // ⏱ Stop after 10 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setActive(false); // 🔥 turn off globally
    }, 10000);

    return () => clearTimeout(timer);
  }, [active, setActive]);

  if (!show) return null;

  if (type === "new_year") {
    return (
      <Confetti
        width={width}
        height={height}
        numberOfPieces={250}
        gravity={0.15}
        recycle={false}   // ❗ important
      />
    );
  }

  return null;
}
