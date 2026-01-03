import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🔥 Celebration Provider
import { CelebrationProvider } from "./context/CelebrationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CelebrationProvider>
      <App />
    </CelebrationProvider>
  </React.StrictMode>
);
