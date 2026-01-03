import promotions from "../data/promotions";
import { FiSend, FiUsers, FiStar } from "react-icons/fi";

export default function Promotions() {
  return (
    <section className="relative py-24 px-6 bg-[#050505] text-white overflow-hidden">
      {/* background glow */}
      <div className="absolute -left-40 top-1/3 w-[400px] h-[400px]
                      bg-pink-600/10 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Promoted <span className="text-pink-500">Businesses</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
             Businesses that paid to reach real, active users on MeowHub.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((item) => (
            <PromotionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function PromotionCard({ item }) {
  return (
    <div
      className="group relative rounded-2xl p-6
                 bg-white/5 backdrop-blur-xl
                 border border-white/10
                 transition-all duration-500 ease-out
                 hover:-translate-y-2
                 hover:border-pink-500/40
                 hover:shadow-[0_20px_60px_rgba(236,72,153,0.15)]"
    >
      {/* Glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl
                      opacity-0 group-hover:opacity-100
                      transition duration-500
                      shadow-[0_0_40px_rgba(236,72,153,0.25)]" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 h-1 w-full
                      bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl" />

      {/* Badge */}
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1 px-3 py-1
                         text-xs rounded-full
                         bg-pink-500/10 text-pink-400">
          {item.type === "group" ? <FiUsers /> : <FiSend />}
          {item.category}
        </span>

        <FiStar className="text-pink-500 opacity-70" />
      </div>

      {/* Title */}
      <h3
        className="text-xl font-semibold mb-3
                   group-hover:text-pink-400 transition"
      >
        {item.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {item.description}
      </p>

      {/* CTA */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2
                   text-sm font-semibold text-pink-400
                   transition-all duration-300
                   group-hover:text-pink-300"
      >
        {item.cta}
        <span className="group-hover:translate-x-1 transition">→</span>
      </a>
    </div>
  );
}
