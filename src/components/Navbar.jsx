import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiHome,
  FiVideo,
  FiMail,
  FiMenu,
  FiX,
  FiWifi
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItem =
    "group relative flex items-center gap-2 px-5 py-2 rounded-full font-medium text-gray-300 transition-all duration-300";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4">
        {/* MAIN BAR */}
        <div
          className="mt-3 h-16 flex items-center justify-between
                     backdrop-blur-xl bg-black/70
                     border border-white/10 rounded-2xl
                     px-5 shadow-lg"
        >
          {/* LOGO + ONLINE */}
          <Link to="/" className="flex items-center gap-3">
            {/* ONLINE ICON */}
            <div className="relative">
              <FiWifi className="text-green-400 text-lg animate-pulse" />
              <span className="absolute inset-0 blur-md bg-green-400 opacity-30 rounded-full" />
            </div>

            {/* BRAND */}
            <span
              className="text-xl font-bold tracking-wide text-pink-500
                         hover:text-pink-400 transition"
            >
              MeowHub
            </span>

            <span className="hidden sm:inline text-xs text-green-400 font-medium">
              Online
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={navItem}>
              <FiHome />
              <span className="relative z-10">Home</span>
              <HoverGlow />
            </NavLink>

            <NavLink to="/chat" className={navItem}>
              <FiVideo />
              <span className="relative z-10">Video Chat</span>
              <HoverGlow />
            </NavLink>

            <NavLink
              to="/contact"
              className="ml-2 flex items-center gap-2 px-6 py-2 rounded-full
                         bg-pink-600 text-white font-semibold
                         transition-all duration-300
                         hover:bg-pink-700
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
                         hover:scale-105"
            >
              <FiMail />
              Contact Us
            </NavLink>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
        >
          <div
            className="backdrop-blur-xl bg-black/80 border border-white/10
                       rounded-2xl p-5 space-y-5 shadow-lg"
          >
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-white"
            >
              <FiHome /> Home
            </NavLink>

            <NavLink
              to="/chat"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-gray-300 hover:text-white"
            >
              <FiVideo /> Video Chat
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full
                         bg-pink-600 text-white font-semibold
                         transition hover:bg-pink-700"
            >
              <FiMail /> Contact Us
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* 🔥 Hover Glow Component */
function HoverGlow() {
  return (
    <span
      className="absolute inset-0 rounded-full
                 bg-pink-500/0 border border-pink-500/0
                 transition-all duration-300
                 group-hover:bg-pink-500/10
                 group-hover:border-pink-500/60
                 group-hover:shadow-[0_0_18px_rgba(236,72,153,0.6)]"
    />
  );
}
