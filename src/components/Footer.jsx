import { Link } from "react-router-dom";
import {
  FiHome,
  FiMessageCircle,
  FiVideo,
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiHeart,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 px-6 pt-14 pb-8 overflow-hidden">
      {/* GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2
                      w-[500px] h-[500px]
                      bg-pink-600/10 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto grid gap-10
                      md:grid-cols-3 items-start">

        {/* BRAND */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-wide">
            Z<span className="text-pink-500">omegle</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-xs mx-auto md:mx-0">
            Talk to real people instantly.
            Private one-to-one video chats with no login.
          </p>
        </div>

        {/* NAV LINKS */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <FooterLink to="/" icon={<FiHome />}>
            Home
          </FooterLink>
          <FooterLink to="/chat" icon={<FiVideo />}>
            Start Video Chat
          </FooterLink>
          <FooterLink to="/contact" icon={<FiMessageCircle />}>
            Contact Us
          </FooterLink>
        </div>

       
      </div>

      {/* DIVIDER */}
      <div className="relative max-w-7xl mx-auto mt-10 border-t border-white/10" />

      {/* COPYRIGHT */}
      <div className="relative mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MeowHub · Made with{" "}
        <FiHeart className="inline text-pink-500" /> in India
      </div>
    </footer>
  );
}

/* ================= SUB COMPONENTS ================= */

function FooterLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 text-gray-400 text-sm
                 transition-all duration-300
                 hover:text-white hover:translate-x-1"
    >
      <span className="text-pink-500">{icon}</span>
      {children}
    </Link>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-9 h-9 flex items-center justify-center
                 rounded-full bg-white/5 border border-white/10
                 text-gray-300 transition-all duration-300
                 hover:text-white hover:border-pink-500/60
                 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]
                 hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}
