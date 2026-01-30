import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  FiSearch,
  FiRefreshCw,
  FiCheckCircle,
  FiLoader,
  FiMapPin,
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiMessageCircle,
} from "react-icons/fi";

const SOCKET_URL = "https://video-chat-backend-7fdm.onrender.com";
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function VideoChat() {
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const [status, setStatus] = useState("connecting");
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  /* ================= INIT ================= */

  useEffect(() => {
    init();
    return cleanup;
    // eslint-disable-next-line
  }, []);

  async function init() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    localVideoRef.current.srcObject = stream;
    await localVideoRef.current.play().catch(() => {});

    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", async () => {
      setStatus("finding");
      const location = await getLocation();
      socketRef.current.emit("join", location);
      socketRef.current.emit("find-partner");
    });

    registerSocketEvents();
  }

  /* ================= SOCKET EVENTS ================= */

  function registerSocketEvents() {
    const socket = socketRef.current;

    socket.on("waiting", () => {
      setStatus("waiting");
      setPartnerInfo(null);
    });

    socket.on("partner-found", async ({ initiator, partner }) => {
      setPartnerInfo(partner);
      setStatus("connected");

      await createPeer();

      if (initiator) {
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socket.emit("offer", offer);
      }
    });

    socket.on("offer", async (offer) => {
      await createPeer();
      await peerRef.current.setRemoteDescription(offer);

      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socket.emit("answer", answer);
    });

    socket.on("answer", async (answer) => {
      if (!peerRef.current) return;
      await peerRef.current.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        await peerRef.current?.addIceCandidate(candidate);
      } catch {}
    });

    socket.on("partner-left", () => {
      resetPeer();
      setStatus("finding-new");
      socket.emit("find-partner");
    });
  }

  /* ================= PEER ================= */

  async function createPeer() {
    if (peerRef.current) return;

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerRef.current = peer;

    localStreamRef.current.getTracks().forEach((track) => {
      peer.addTrack(track, localStreamRef.current);
    });

    peer.ontrack = (e) => {
      const stream = e.streams[0];
      if (!stream) return;
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play().catch(() => {});
    };

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socketRef.current.emit("ice-candidate", e.candidate);
      }
    };

    peer.onconnectionstatechange = () => {
      if (peer.connectionState === "failed") {
        socketRef.current.emit("skip");
        resetPeer();
      }
    };
  }

  /* ================= CONTROLS ================= */

  function skipPartner() {
    socketRef.current.emit("skip");
    resetPeer();
    setStatus("finding-new");
  }

  function resetPeer() {
    if (peerRef.current) {
      peerRef.current.ontrack = null;
      peerRef.current.onicecandidate = null;
      peerRef.current.close();
      peerRef.current = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setPartnerInfo(null);
  }

  function toggleMic() {
    localStreamRef.current
      ?.getAudioTracks()
      .forEach((t) => (t.enabled = !micOn));
    setMicOn(!micOn);
  }

  function toggleCamera() {
    localStreamRef.current
      ?.getVideoTracks()
      .forEach((t) => (t.enabled = !cameraOn));
    setCameraOn(!cameraOn);
  }

  function cleanup() {
    socketRef.current?.disconnect();

    localStreamRef.current?.getTracks().forEach((t) => t.stop());

    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }
  }

  /* ================= STATUS ================= */

  const statusMap = {
    connecting: { icon: FiLoader, text: "Connecting…" },
    finding: { icon: FiSearch, text: "Finding partner…" },
    waiting: { icon: FiLoader, text: "Waiting…" },
    connected: { icon: FiCheckCircle, text: "Connected" },
    "finding-new": { icon: FiRefreshCw, text: "Finding new partner…" },
  };

  const StatusIcon = statusMap[status].icon;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 relative flex items-center justify-center">
        <div className="h-full max-h-[80vh] aspect-[9/14] rounded-2xl overflow-hidden relative bg-black">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {status !== "connected" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-5 py-3 rounded-full bg-black/70 flex gap-2 text-sm animate-pulse">
                <StatusIcon className="text-pink-500" />
                {statusMap[status].text}
              </div>
            </div>
          )}

          {partnerInfo && status === "connected" && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 text-xs">
                {partnerInfo.code && (
                  <img
                    src={`https://flagcdn.com/w40/${partnerInfo.code}.png`}
                    className="w-5 h-4"
                    alt=""
                  />
                )}
                <FiMapPin className="text-pink-500" />
                {partnerInfo.country}, {partnerInfo.state}
              </div>
            </div>
          )}
        </div>

        <video
          ref={localVideoRef}
          muted
          autoPlay
          playsInline
          className={`absolute object-cover rounded-lg border border-white/30
            ${
              isMobile
                ? "bottom-4 right-4 w-24 aspect-[9/16]"
                : "bottom-6 right-6 w-40 aspect-video"
            }`}
        />
      </div>

      <div className="h-20 flex justify-center gap-6 items-center bg-black/80 border-t border-white/10">
        <button
          onClick={toggleCamera}
          className={`p-3 rounded-full ${cameraOn ? "bg-white/10" : "bg-red-600"}`}
        >
          {cameraOn ? <FiVideo /> : <FiVideoOff />}
        </button>

        <button
          onClick={skipPartner}
          className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-700"
        >
          Skip
        </button>

        <button
          onClick={toggleMic}
          className={`p-3 rounded-full ${micOn ? "bg-white/10" : "bg-red-600"}`}
        >
          {micOn ? <FiMic /> : <FiMicOff />}
        </button>

        <button
          onClick={() => navigate("/chat-text")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          title="Switch to Text Chat"
        >
          <FiMessageCircle className="text-lg" />
        </button>
      </div>
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
      state: data.region || "Unknown",
      code: data.country_code?.toLowerCase() || null,
    };
  } catch {
    return { country: "Unknown", state: "Unknown", code: null };
  }
}
