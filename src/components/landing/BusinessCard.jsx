export default function BusinessCard({ name, category, desc, cta }) {
  return (
    <div
      className="group rounded-2xl p-6
                 bg-white/5 backdrop-blur-xl
                 border border-white/10
                 transition-all duration-300
                 hover:border-pink-500/40
                 hover:-translate-y-1"
    >
      <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
                       bg-pink-500/10 text-pink-400">
        {category}
      </span>

      <h3 className="text-xl font-semibold mb-2
                     group-hover:text-pink-400 transition">
        {name}
      </h3>

      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
        {desc}
      </p>

      <button className="text-sm font-medium text-pink-400
                         transition group-hover:text-pink-300">
        {cta} →
      </button>
    </div>
  );
}
