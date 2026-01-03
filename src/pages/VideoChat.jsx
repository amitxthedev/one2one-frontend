import { useEffect, useRef, useState } from "react";
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
} from "react-icons/fi";

const SOCKET_URL = "https://video-chat-backend-7fdm.onrender.com";
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function VideoChat() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);

  const [status, setStatus] = useState("connecting");
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  /* ================= INIT ================= */

  useEffect(() => {
    start();
    return cleanup;
    // eslint-disable-next-line
  }, []);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    localVideoRef.current.srcObject = stream;
    await localVideoRef.current.play().catch(() => {});

    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", async () => {
      setStatus("finding");
      const location = await getLocation();
      socketRef.current.emit("join", location);
      socketRef.current.emit("find-partner");
    });

    socketEvents();
  }

  /* ================= SOCKET EVENTS ================= */

  function socketEvents() {
    socketRef.current.on("waiting", () => {
      setStatus("waiting");
      setPartnerInfo(null);
    });

    socketRef.current.on("partner-found", async ({ initiator, partner }) => {
      setPartnerInfo(partner);
      setStatus("connected");

      await createPeer();

      if (initiator) {
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socketRef.current.emit("offer", offer);
      }
    });

    socketRef.current.on("offer", async (offer) => {
      await createPeer();
      await peerRef.current.setRemoteDescription(offer);

      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", answer);
    });

    socketRef.current.on("answer", async (answer) => {
      await peerRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on("ice-candidate", (candidate) => {
      peerRef.current?.addIceCandidate(candidate);
    });

    socketRef.current.on("partner-left", () => {
      resetCall();
      socketRef.current.emit("find-partner");
    });
  }

  /* ================= PEER ================= */

  async function createPeer() {
    if (peerRef.current) return;

    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStreamRef.current.getTracks().forEach((track) => {
      peerRef.current.addTrack(track, localStreamRef.current);
    });

    peerRef.current.ontrack = (event) => {
      const stream = event.streams[0];
      if (!stream) return;
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play().catch(() => {});
    };

    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", event.candidate);
      }
    };
  }

  /* ================= MEDIA CONTROLS ================= */

  function toggleMic() {
    localStreamRef.current
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !micOn));
    setMicOn(!micOn);
  }

  function toggleCamera() {
    localStreamRef.current
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = !cameraOn));
    setCameraOn(!cameraOn);
  }

  /* ================= CONTROLS ================= */

  function skipPartner() {
    socketRef.current.emit("skip");
    resetCall();
  }

  function resetCall() {
    setStatus("finding-new");
    peerRef.current?.close();
    peerRef.current = null;

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  }

  function cleanup() {
    socketRef.current?.disconnect();
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    peerRef.current?.close();
  }

  /* ================= STATUS CONFIG ================= */

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
      {/* VIDEO AREA */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
        {/* REMOTE VIDEO */}
        <div className="h-full max-h-[80vh] aspect-[9/14] bg-black rounded-2xl overflow-hidden shadow-2xl relative">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* CENTER STATUS */}
          {status !== "connected" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-black/70 backdrop-blur text-sm animate-pulse">
                <StatusIcon className="text-pink-500" />
                <span>{statusMap[status].text}</span>
              </div>
            </div>
          )}

          {/* LOCATION BUTTON */}
          {partnerInfo && status === "connected" && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur border border-white/10 text-xs cursor-default">
                {partnerInfo.code && (
                  <img
                    src={`https://flagcdn.com/w40/${partnerInfo.code}.png`}
                    alt={partnerInfo.country}
                    className="w-5 h-4 rounded-sm"
                  />
                )}
                <FiMapPin className="text-pink-500" />
                <span>
                  {partnerInfo.country}, {partnerInfo.state}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* LOCAL VIDEO */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={`absolute object-cover rounded-lg border border-white/30 shadow-lg
            ${
              isMobile
                ? "bottom-4 right-4 w-24 aspect-[9/16]"
                : "bottom-6 right-6 w-40 aspect-video"
            }`}
        />
      </div>

      {/* CONTROLS */}
      <div className="h-20 flex items-center justify-center gap-6 bg-black/80 border-t border-white/10">
        {/* CAMERA */}
        <button
          onClick={toggleCamera}
          className={`p-3 rounded-full transition
            ${cameraOn ? "bg-white/10" : "bg-red-600"}`}
        >
          {cameraOn ? <FiVideo /> : <FiVideoOff />}
        </button>

        {/* SKIP */}
        <button
          onClick={skipPartner}
          className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-700 transition"
        >
          Skip
        </button>

        {/* MIC */}
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full transition
            ${micOn ? "bg-white/10" : "bg-red-600"}`}
        >
          {micOn ? <FiMic /> : <FiMicOff />}
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
    return {
      country: "Unknown",
      state: "Unknown",
      code: null,
    };
  }
}
