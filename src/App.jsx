import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import VideoChat from "./pages/VideoChat";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/chat" element={<VideoChat />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
