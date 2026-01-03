function Stat({ number, label }) {
  return (
    <div className="text-center">
      <span className="block text-lg font-bold text-white">
        {number}
      </span>
      <span className="text-gray-400 text-xs uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
      <Stat number="10K+" label="Daily Users" />
      <Stat number="120+" label="Cities" />
      <Stat number="100+" label="Businesses" />
    </div>
  );
}
