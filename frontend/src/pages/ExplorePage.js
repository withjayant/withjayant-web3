import React, { useState, useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

export default function ExplorePage() {
  const { contract } = useWeb3();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!contract) { setLoading(false); return; }
    contract.getLatestPosts(50)
      .then(raw => setPosts(raw.filter(p => p.exists)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [contract]);

  const filtered = posts.filter(p =>
    p.caption.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-title">🔍 Explore</div>
        </div>

        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
          <input
            className="form-input"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: "0 auto 16px", width: 32, height: 32, borderWidth: 3 }} />
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="icon">🔍</span>
            <div>No posts found</div>
          </div>
        ) : (
          filtered.map(post => <PostCard key={post.id.toString()} post={post} />)
        )}
      </div>
      <RightSidebar />
    </div>
  );
}
