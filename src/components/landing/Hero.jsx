import { Link } from "react-router-dom";
import Stats from "./Stats";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 bg-black overflow-hidden">
      {/* glow */}
      <div
        className="absolute -right-40 top-1/3 w-[400px] h-[400px]
                   bg-pink-600/20 blur-[140px] rounded-full"
      />

      <div className="relative max-w-4xl text-center">
        {/* HEADING */}
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight
                     animate-fade-up"
        >
          Talk to <span className="text-pink-500">Real People</span>
          <br />
          Instantly
        </h1>

        {/* SUBTEXT */}
        <p
          className="text-gray-400 text-lg mb-8
                     animate-fade-up delay-100"
        >
          One-to-one private video chats.
          <br className="hidden sm:block" />
          No login. No signup. Just connect.
        </p>

        {/* CTA BUTTONS */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8
                     animate-fade-up delay-200"
        >
          <Link
            to="/chat"
            className="px-10 py-4 rounded-full bg-pink-600
                       font-semibold transition-all
                       hover:bg-pink-700 hover:scale-105
                       hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]"
          >
            Get Started
          </Link>

          <Link
            to="/contact"
            className="px-10 py-4 rounded-full border border-white/20
                       text-gray-200 transition
                       hover:bg-white/10 hover:border-white/40"
          >
            Promote Your Business
          </Link>
        </div>

        {/* STATS */}
        <div className="animate-fade-up delay-300">
          <Stats />
        </div>
      </div>
    </section>
  );
}
