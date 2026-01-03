import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row
                      justify-between items-center gap-6">

        {/* BRAND */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">
            One<span className="text-pink-500">2</span>One
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Talk to real people instantly.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex gap-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
          <Link to="/chat" className="hover:text-white transition">
            Start Chat
          </Link>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} One2One. All rights reserved.
      </div>
    </footer>
  );
}
