import promotions from "../data/promotions";

export default function Promotions() {
  return (
    <section className="py-20 px-6 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Promoted <span className="text-pink-500">Businesses</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Businesses that paid to reach real, active users on One2One.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((item) => (
            <BusinessCard
              key={item.id}
              name={item.name}
              category={item.category}
              desc={item.description}
              cta={item.cta}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ================= PROMOTION CARD ================= */

function BusinessCard({ name, category, desc, cta }) {
  return (
    <div
      className="group relative rounded-2xl p-6
                 bg-white/5 backdrop-blur-xl
                 border border-white/10
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:border-pink-500/40
                 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 h-1 w-full
                      bg-gradient-to-r from-pink-500 to-purple-500" />

      {/* Category */}
      <span
        className="inline-block mb-4 px-3 py-1 text-xs rounded-full
                   bg-pink-500/10 text-pink-400"
      >
        {category}
      </span>

      {/* Business name */}
      <h3
        className="text-xl font-semibold mb-3
                   group-hover:text-pink-400 transition"
      >
        {name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        {desc}
      </p>

      {/* CTA */}
      <button
        className="text-sm font-medium text-pink-400
                   transition group-hover:text-pink-300"
      >
        {cta} →
      </button>
    </div>
  );
}
