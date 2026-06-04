import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Web3Provider } from "./context/Web3Context";
import { registerToast } from "./utils/helpers";
import LandingPage  from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage     from "./pages/FeedPage";
import ExplorePage  from "./pages/ExplorePage";
import ProfilePage  from "./pages/ProfilePage";
import "./styles/global.css";

function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  return (
    <div className={`toast ${type}`}>
      {icons[type] || "ℹ️"} {msg}
    </div>
  );
}

function ToastManager() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    registerToast((msg, type) => setToasts(p => [...p, { msg, type, id: Date.now() }]));
  }, []);
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <Toast key={t.id} msg={t.msg} type={t.type}
          onDone={() => setToasts(p => p.filter(x => x.id !== t.id))} />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<LandingPage />}  />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/feed"     element={<FeedPage />}     />
          <Route path="/explore"  element={<ExplorePage />}  />
          <Route path="/profile"  element={<ProfilePage />}  />
          <Route path="*"         element={<Navigate to="/" />} />
        </Routes>
        <ToastManager />
      </BrowserRouter>
    </Web3Provider>
  );
}
