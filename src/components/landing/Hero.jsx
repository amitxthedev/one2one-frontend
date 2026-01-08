import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Stats from "./Stats";
import {
  FiVideo,
  FiBriefcase,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";

const SOCKET_URL = "http://localhost:5000";

export default function Hero() {
  const [online, setOnline] = useState(0);

  /* ================= REALTIME ONLINE USERS ================= */
  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("online-count", (count) => {
      setOnline(count);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 bg-black overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -right-40 top-1/3 w-[400px] h-[400px]
                      bg-pink-600/20 blur-[140px] rounded-full" />

      <div className="relative max-w-4xl text-center">

        {/* LOGO */}
        <div className="flex justify-center mb-4 animate-fade-up">
          <img
            src="/meowhub.svg"
            alt="MeowHub"
            className="w-28 md:w-36
                       drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]"
          />
        </div>

        {/* TAGLINE */}
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
          Private one-to-one video & text chats.
          <br className="hidden sm:block" />
          No login. No signup. Just connect.
        </p>

        {/* CTA BUTTONS */}
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-4
                     justify-center items-center mb-6
                     animate-fade-up delay-300"
        >
          {/* ONLINE USERS */}
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full
                       bg-black/60 backdrop-blur
                       border border-green-500/40
                       shadow-[0_0_20px_rgba(34,197,94,0.35)]
                       animate-pulse"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full
                               rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3
                               rounded-full bg-green-500" />
            </span>

            <FiUsers className="text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {online} Online
            </span>
          </div>
          {/* VIDEO CHAT */}
          <Link
            to="/chat"
            className="flex items-center gap-2 px-10 py-4 rounded-full
                       bg-pink-600 text-white font-semibold
                       transition-all
                       hover:bg-pink-700 hover:scale-105
                       hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]"
          >
            <FiVideo />
            Video Chat
          </Link>

          

          {/* TEXT CHAT */}
          <Link
            to="/chat-text"
            className="flex items-center gap-2 px-10 py-4 rounded-full
                       bg-white/10 border border-white/20
                       text-white font-semibold
                       transition-all
                       hover:bg-white/15 hover:scale-105
                       hover:border-pink-500/60
                       hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]"
          >
            <FiMessageCircle className="text-pink-400" />
            Text Chat
          </Link>

          {/* PROMOTE */}
          <Link
            to="/contact"
            className="flex items-center gap-2 px-10 py-4 rounded-full
                       border border-white/20
                       text-gray-200 transition
                       hover:bg-white/10 hover:border-white/40"
          >
            <FiBriefcase />
            Promote
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
