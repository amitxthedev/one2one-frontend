import { useEffect, useRef } from "react";
import Promotions from "../components/Promotions";
import Hero from "../components/landing/Hero";
import Footer from "../components/Footer";

export default function Landing() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="text-white bg-black overflow-hidden">
      {/* HERO (no animation needed, first view) */}
      <Hero />

      {/* PROMOTIONS – scroll reveal */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="reveal"
      >
        <Promotions />
      </section>

      {/* FOOTER – scroll reveal */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="reveal"
      >
        <Footer />
      </section>
    </div>
  );
}
