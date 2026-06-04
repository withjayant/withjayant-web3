import React, { useState, useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import { avatarColor, initials, shortAddr } from "../utils/helpers";

export default function ProfilePage() {
  const { contract, address, user, connected, connect } = useWeb3();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bg, fg] = avatarColor(address);

  useEffect(() => {
    if (!contract || !address) { setLoading(false); return; }
    contract.getUserPosts(address).then(async ids => {
      const fetched = await Promise.all(ids.map(id => contract.getPost(id)));
      setPosts([...fetched].reverse());
    }).catch(console.error).finally(() => setLoading(false));
  }, [contract, address]);

  if (!connected) return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="empty-state" style={{ marginTop: "4rem" }}>
          <span className="icon">👤</span>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Not connected</div>
          <button className="btn btn-primary" onClick={connect}>🦊 Connect MetaMask</button>
        </div>
      </div>
    </div>
  );

  if (!user) return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="empty-state" style={{ marginTop: "4rem" }}>
          <span className="icon">🚀</span>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No profile yet</div>
          <button className="btn btn-primary" onClick={() => navigate("/register")}>Create Profile</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-title">👤 Profile</div>
        </div>

        <div className="profile-banner" />
        <div className="profile-info">
          <div className="profile-avatar" style={{ background: bg, color: fg }}>
            {initials(user.username)}
          </div>
          <div className="profile-name">{user.username}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}>{shortAddr(address)}</div>
          {user.bio && <div className="profile-bio">{user.bio}</div>}
          <div className="profile-stats">
            <div>
              <div className="profile-stat-num">{user.postCount.toString()}</div>
              <div className="profile-stat-label">Posts</div>
            </div>
            <div>
              <div className="profile-stat-num">{user.followers.toString()}</div>
              <div className="profile-stat-label">Followers</div>
            </div>
            <div>
              <div className="profile-stat-num">{user.following.toString()}</div>
              <div className="profile-stat-label">Following</div>
            </div>
            <div>
              <div className="profile-stat-num" style={{ color: "var(--accent2)" }}>
                {user.tokens.toString()} 🪙
              </div>
              <div className="profile-stat-label">CGT Tokens</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }}>
          {loading ? (
            <div className="empty-state"><div className="spinner" style={{ margin: "0 auto" }} /></div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <span className="icon">📭</span>
              <div>No posts yet</div>
            </div>
          ) : posts.map(p => <PostCard key={p.id.toString()} post={p} />)}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
