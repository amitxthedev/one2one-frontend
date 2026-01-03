import { useEffect, useState } from "react";

/* ================= SINGLE STAT ================= */

function AnimatedStat({ value, label, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200; // animation duration (ms)
    const stepTime = 20;
    const increment = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <span className="block text-lg font-bold text-white">
        {count}
        {suffix}
      </span>
      <span className="text-gray-400 text-xs uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

/* ================= STATS WRAPPER ================= */

export default function Stats() {
  return (
    <div className="flex flex-wrap justify-center gap-8 text-sm">
      <AnimatedStat value={10000} suffix="+" label="Daily Users" />
      <AnimatedStat value={120} suffix="+" label="Cities" />
      <AnimatedStat value={100} suffix="+" label="Businesses" />
    </div>
  );
}
