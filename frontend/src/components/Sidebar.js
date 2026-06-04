import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import { shortAddr, avatarColor, initials } from "../utils/helpers";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, user, connected, connect, loading } = useWeb3();

  const links = [
    { path: "/feed",    icon: "🏠", label: "Home"    },
    { path: "/explore", icon: "🔍", label: "Explore"  },
    { path: "/profile", icon: "👤", label: "Profile"  },
  ];

  const [bg, fg] = avatarColor(address);

  return (
    <aside className="sidebar">
      <div className="logo">
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" style={{marginRight:6,verticalAlign:"middle"}}>
          <circle cx="20" cy="20" r="18" stroke="url(#sl1)" strokeWidth="2.5" fill="none"/>
          <circle cx="20" cy="20" r="5" fill="url(#sl2)"/>
          <circle cx="20" cy="6"  r="3" fill="#7C5CBF"/>
          <circle cx="32" cy="27" r="2.5" fill="#5DCAA5"/>
          <defs>
            <linearGradient id="sl1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7C5CBF"/><stop offset="1" stopColor="#5DCAA5"/>
            </linearGradient>
            <linearGradient id="sl2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7C5CBF"/><stop offset="1" stopColor="#5DCAA5"/>
            </linearGradient>
          </defs>
        </svg>
        WithJayant
      </div>

      {links.map(l => (
        <button
          key={l.path}
          className={`nav-link ${location.pathname === l.path ? "active" : ""}`}
          onClick={() => navigate(l.path)}
        >
          <span className="icon">{l.icon}</span>
          <span className="label">{l.label}</span>
        </button>
      ))}

      <div className="wallet-card">
        <div className="wallet-label">Wallet</div>
        {connected ? (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
              <div className="compose-avatar" style={{ background:bg, color:fg, width:32, height:32, fontSize:11 }}>
                {user ? initials(user.username) : "?"}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:600 }}>{user?.username || "Unregistered"}</div>
                <div className="wallet-addr">{shortAddr(address)}</div>
              </div>
            </div>
            <div className="wallet-bal">🪙 {user ? user.tokens.toString() : 0} CGT</div>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" style={{ marginTop:10, width:"100%" }} onClick={connect} disabled={loading}>
            {loading ? <span className="spinner" /> : "🦊 Connect"}
          </button>
        )}
      </div>
    </aside>
  );
}
