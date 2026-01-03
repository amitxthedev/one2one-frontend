import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItem =
    "group relative px-5 py-2 rounded-full font-medium text-gray-300 transition-all duration-300";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4">
        {/* MAIN BAR */}
        <div className="mt-3 h-16 flex items-center justify-between
                        backdrop-blur-xl bg-black/70
                        border border-white/10 rounded-2xl
                        px-5 shadow-lg">

          {/* LOGO + ONLINE STATUS */}
          <Link to="/" className="flex items-center gap-3">
            {/* GREEN DOT */}
            <span
              className="relative flex h-3 w-3"
              aria-label="Online"
            >
              <span className="animate-online absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>

            {/* BRAND */}
            <span className="text-xl font-bold tracking-wide text-pink-500
                             hover:text-pink-400 transition">
              One2One
            </span>

            {/* ONLINE TEXT (SMALL, OPTIONAL) */}
            <span className="hidden sm:inline text-xs text-green-400 font-medium">
              Online
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">

            <NavLink to="/" className={navItem}>
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 rounded-full
                               bg-pink-500/0 border border-pink-500/0
                               transition-all duration-300
                               group-hover:bg-pink-500/10
                               group-hover:border-pink-500/60
                               group-hover:shadow-[0_0_18px_rgba(236,72,153,0.6)]" />
            </NavLink>

            <NavLink to="/chat" className={navItem}>
              <span className="relative z-10">Video Chat</span>
              <span className="absolute inset-0 rounded-full
                               bg-pink-500/0 border border-pink-500/0
                               transition-all duration-300
                               group-hover:bg-pink-500/10
                               group-hover:border-pink-500/60
                               group-hover:shadow-[0_0_18px_rgba(236,72,153,0.6)]" />
            </NavLink>

            <NavLink
              to="/contact"
              className="ml-2 px-6 py-2 rounded-full
                         bg-pink-600 text-white font-semibold
                         transition-all duration-300
                         hover:bg-pink-700
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
                         hover:scale-105"
            >
              Contact Us
            </NavLink>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center"
          >
            <span
              className={`absolute h-[2px] w-6 bg-white transition-all duration-300
                ${open ? "rotate-45" : "-translate-y-2"}`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-white transition-all duration-300
                ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-white transition-all duration-300
                ${open ? "-rotate-45" : "translate-y-2"}`}
            />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
        >
          <div className="backdrop-blur-xl bg-black/80 border border-white/10
                          rounded-2xl p-5 space-y-5 shadow-lg">

            <NavLink to="/" onClick={() => setOpen(false)} className="block text-gray-300 hover:text-white">
              Home
            </NavLink>

            <NavLink to="/chat" onClick={() => setOpen(false)} className="block text-gray-300 hover:text-white">
              Video Chat
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-center px-5 py-3 rounded-full
                         bg-pink-600 text-white font-semibold
                         transition hover:bg-pink-700"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
