import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
    FiSend,
    FiSearch,
    FiRefreshCw,
    FiMessageCircle,
    FiMapPin,
    FiLoader,
    FiSkipForward,
} from "react-icons/fi";

const SOCKET_URL = "https://video-chat-backend-7fdm.onrender.com";

export default function TextChat() {
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [status, setStatus] = useState("connecting");
    const [partnerInfo, setPartnerInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [typing, setTyping] = useState(false);

    /* ================= INIT ================= */

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on("connect", async () => {
            setStatus("finding");
            const location = await getLocation();
            socketRef.current.emit("join", location);
            socketRef.current.emit("find-partner");
        });

        socketEvents();

        return () => socketRef.current.disconnect();
    }, []);

    /* ================= SOCKET EVENTS ================= */

    function socketEvents() {
        socketRef.current.on("waiting", () => {
            setStatus("waiting");
            setMessages([]);
            setPartnerInfo(null);
        });

        socketRef.current.on("partner-found", ({ partner }) => {
            setPartnerInfo(partner);
            setStatus("connected");
            setMessages([]);
        });

        socketRef.current.on("receive-message", (msg) => {
            setMessages((prev) => [...prev, { ...msg, mine: false }]);
            setTyping(false);
            scrollDown();
        });

        socketRef.current.on("partner-typing", () => {
            setTyping(true);
            setTimeout(() => setTyping(false), 1500);
        });

        socketRef.current.on("partner-left", () => {
            setStatus("finding-new");
            setMessages([]);
            socketRef.current.emit("find-partner");
        });
    }

    /* ================= ACTIONS ================= */

    function sendMessage(e) {
        e.preventDefault();
        if (!text.trim()) return;

        socketRef.current.emit("send-message", text);

        setMessages((prev) => [
            ...prev,
            { text, mine: true, time: Date.now() },
        ]);

        setText("");
        scrollDown();
    }

    function handleTyping() {
        socketRef.current.emit("typing");
    }

    function skipChat() {
        socketRef.current.emit("skip");
        setMessages([]);
        setStatus("finding-new");
    }

    function scrollDown() {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    }

    /* ================= UI ================= */

    return (
        // ⬇️ PUSH PAGE BELOW FIXED NAVBAR (IMPORTANT)
        <div className="min-h-screen bg-black text-white pt-20 flex flex-col">

            {/* ===== TEXT CHAT HEADER (STICKY, NOT HIDDEN) ===== */}
            <div className="sticky top-20 z-40
                      flex items-center justify-between px-6 py-3
                      border-b border-white/10
                      bg-black/90 backdrop-blur">

                <div className="flex items-center gap-3">
                    <FiMessageCircle className="text-pink-500" />
                    <span className="font-semibold text-sm">Text Chat</span>
                </div>

                {/* PARTNER LOCATION */}
                {partnerInfo && status === "connected" && (
                    <div className="flex items-center gap-2 text-xs
                          bg-white/5 px-3 py-1.5 rounded-full">
                        {partnerInfo.code && (
                            <img
                                src={`https://flagcdn.com/w20/${partnerInfo.code}.png`}
                                alt="flag"
                                className="rounded-sm"
                            />
                        )}
                        <FiMapPin className="text-pink-400" />
                        <span>{partnerInfo.country}</span>
                    </div>
                )}

                {/* SKIP BUTTON (VISIBLE & CLEAR) */}
                {status === "connected" && (
                    <button
                        onClick={skipChat}
                        className="flex items-center gap-2 px-4 py-1.5
                       rounded-full bg-red-600/90
                       hover:bg-red-700 transition text-xs font-medium"
                    >
                        <FiSkipForward />
                        Skip
                    </button>
                )}
            </div>

            {/* ===== CHAT AREA ===== */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">

                {/* STATUS */}
                {status !== "connected" && (
                    <div className="flex justify-center mt-24">
                        <div className="flex items-center gap-2 px-5 py-2
                            rounded-full bg-white/5 text-sm animate-pulse">
                            {status === "finding" && <FiSearch />}
                            {status === "waiting" && <FiLoader />}
                            {status === "finding-new" && <FiRefreshCw />}
                            <span>
                                {status === "finding" && "Finding partner..."}
                                {status === "waiting" && "Waiting..."}
                                {status === "finding-new" && "Finding new partner..."}
                            </span>
                        </div>
                    </div>
                )}

                {/* MESSAGES */}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`
        relative max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed
        transition-all animate-fade-up
        ${msg.mine
                                    ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-br-md shadow-[0_0_18px_rgba(236,72,153,0.45)]"
                                    : "bg-white/10 text-gray-200 rounded-bl-md backdrop-blur"
                                }
      `}
                        >
                            {msg.text}

                            {/* TIME */}
                            <div className="mt-1 text-[10px] opacity-60 text-right">
                                {new Date(msg.time || Date.now()).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                ))}


                {typing && (
                    <div className="text-xs text-gray-400 italic">
                        Partner typing...
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* ===== INPUT BAR ===== */}
            {status === "connected" && (
                <form
                    onSubmit={sendMessage}
                    className="sticky bottom-0 z-40
                     px-6 py-3 flex items-center gap-3
                     border-t border-white/10
                     bg-black/90 backdrop-blur"
                >
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleTyping}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 rounded-full
                       px-4 py-2 outline-none text-sm"
                    />

                    <button
                        type="submit"
                        className="p-3 rounded-full
                       bg-pink-600 hover:bg-pink-700 transition"
                    >
                        <FiSend />
                    </button>
                </form>
            )}
        </div>
    );
}

/* ================= LOCATION ================= */

async function getLocation() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        return {
            country: data.country_name || "Unknown",
            code: data.country_code?.toLowerCase(),
        };
    } catch {
        return { country: "Unknown", code: null };
    }
}
