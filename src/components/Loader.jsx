import { FiLoader } from "react-icons/fi";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* LOGO / ICON */}
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-pink-500/30 blur-xl animate-pulse" />
          <FiLoader className="relative text-pink-500 text-5xl animate-spin-slow" />
        </div>

        {/* TEXT */}
        <p className="text-gray-400 tracking-wide text-sm">
          Loading MeowHub…
        </p>
      </div>
    </div>
  );
}
