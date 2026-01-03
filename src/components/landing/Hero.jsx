import { Link } from "react-router-dom";
import Stats from "./Stats";
import { FiVideo, FiBriefcase, FiMessageCircle } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 bg-black overflow-hidden">
      {/* glow */}
      <div
        className="absolute -right-40 top-1/3 w-[400px] h-[400px]
                   bg-pink-600/20 blur-[140px] rounded-full"
      />

      <div className="relative max-w-4xl text-center">

        {/* 🐱 MEOWHUB SVG */}
        <div className="flex justify-center mb-4 animate-fade-up">
          <img
            src="/meowhub.svg"
            alt="MeowHub"
            className="w-28 md:w-36
                       drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]"
          />
        </div>

        {/* ICON TAGLINE */}
        <div className="flex items-center justify-center gap-2 mb-4
                        text-pink-400 text-sm tracking-wide
                        animate-fade-up delay-75">
          <FiMessageCircle />
          <span>Live One-to-One Conversations</span>
        </div>

        {/* HEADING */}
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight
                     animate-fade-up delay-100"
        >
          Talk to <span className="text-pink-500">Real People</span>
          <br />
          Instantly
        </h1>

        {/* SUBTEXT */}
        <p
          className="text-gray-400 text-lg mb-8
                     animate-fade-up delay-200"
        >
          One-to-one private video chats.
          <br className="hidden sm:block" />
          No login. No signup. Just connect.
        </p>

        {/* CTA BUTTONS */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8
                     animate-fade-up delay-300"
        >
          <Link
            to="/chat"
            className="flex items-center justify-center gap-2
                       px-10 py-4 rounded-full bg-pink-600
                       font-semibold transition-all
                       hover:bg-pink-700 hover:scale-105
                       hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]"
          >
            <FiVideo className="text-lg" />
            Get Started
          </Link>

          <Link
            to="/contact"
            className="flex items-center justify-center gap-2
                       px-10 py-4 rounded-full border border-white/20
                       text-gray-200 transition
                       hover:bg-white/10 hover:border-white/40"
          >
            <FiBriefcase className="text-lg" />
            Promote Your Business
          </Link>
        </div>

        {/* STATS */}
        <div className="animate-fade-up delay-500">
          <Stats />
        </div>
      </div>
    </section>
  );
}
