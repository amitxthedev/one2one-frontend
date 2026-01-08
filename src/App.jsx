import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import VideoChat from "./pages/VideoChat";
import TextChat from "./pages/TextChat";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";
import BackToTop from "./components/BackToTop";

/* ================= ROUTE + LOADER WRAPPER ================= */

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  /* ===== Initial app load ===== */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* ===== On route change ===== */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  /* ===== Disable BackToTop on chat pages ===== */
  const hideBackToTop =
    location.pathname === "/chat" ||
    location.pathname === "/chat-text";

  return (
    <>
      {/* LOADER */}
      {loading && <Loader />}

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<VideoChat />} />
          <Route path="/chat-text" element={<TextChat />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {/* BACK TO TOP (disabled on chat pages) */}
      {!hideBackToTop && <BackToTop />}
    </>
  );
}

/* ================= ROOT APP ================= */

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
