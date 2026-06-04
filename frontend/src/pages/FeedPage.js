import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import ComposeBox from "../components/ComposeBox";
import PostCard from "../components/PostCard";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

export default function FeedPage() {
  const { contract, connected, user, network } = useWeb3();
  const navigate = useNavigate();
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const raw = await contract.getLatestPosts(20);
      setPosts(raw.filter(p => p.exists));
    } catch (err) {
      console.error("loadPosts:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <div className="topbar-title">🏠 Home Feed</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {connected && !user && (
              <button className="btn btn-green btn-sm" onClick={() => navigate("/register")}>
                Create Profile
              </button>
            )}
            <span className="network-pill">
              {network ? network.name : "Disconnected"}
            </span>
          </div>
        </div>

        {connected && user && <ComposeBox onPost={loadPosts} />}

        {!connected && (
          <div className="empty-state">
            <span className="icon">🔗</span>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Connect your wallet</div>
            <div style={{ marginBottom: 16 }}>Connect MetaMask to post, like, and earn CGT tokens</div>
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: "0 auto 16px", width: 32, height: 32, borderWidth: 3 }} />
            Loading posts from chain...
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <span className="icon">📭</span>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No posts yet</div>
            <div>Be the first to mint a post on-chain!</div>
          </div>
        ) : (
          posts.map(post => <PostCard key={post.id.toString()} post={post} onLikeChange={loadPosts} />)
        )}
      </div>
      <RightSidebar />
    </div>
  );
}
