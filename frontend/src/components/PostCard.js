import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { shortAddr, timeAgo, avatarColor, initials, shortHash, toast } from "../utils/helpers";

export default function PostCard({ post, onLikeChange }) {
  const { contract, address, user } = useWeb3();
  const [liking, setLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(Number(post.likes));
  const [isLiked, setIsLiked] = useState(false);

  const [bg, fg] = avatarColor(post.author);

  const handleLike = async () => {
    if (!contract || !user) { toast("Connect wallet and register first!", "error"); return; }
    setLiking(true);
    try {
      if (isLiked) {
        const tx = await contract.unlikePost(post.id);
        await tx.wait();
        setIsLiked(false);
        setLocalLikes(p => p - 1);
      } else {
        const tx = await contract.likePost(post.id);
        await tx.wait();
        setIsLiked(true);
        setLocalLikes(p => p + 1);
        toast("+1 CGT earned for liking!", "success");
      }
      if (onLikeChange) onLikeChange();
    } catch (err) {
      toast(err.reason || "Transaction failed", "error");
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar" style={{ background: bg, color: fg }}>
          {initials(post.author)}
        </div>
        <div className="post-meta">
          <div className="post-username">{shortAddr(post.author)}</div>
          <div className="post-time">{timeAgo(post.timestamp)}</div>
        </div>
        <span className="nft-tag">NFT #{post.id.toString()}</span>
      </div>

      <p className="post-caption">
        {post.caption} <span className="post-tag">#OnChain</span>
      </p>

      <div className="post-proof">
        <div className="pulse-dot" />
        <span>Post #{post.id.toString()} · {shortAddr(post.author)} · On-chain forever</span>
      </div>

      <div className="post-actions">
        <button className={`action-btn ${isLiked ? "liked" : ""}`} onClick={handleLike} disabled={liking}>
          {liking ? <span className="spinner" style={{width:14,height:14}} /> : (isLiked ? "❤️" : "🤍")}
          {localLikes}
        </button>
        <button className="action-btn">💬 Comment</button>
        <button className="action-btn">🔁 Repost</button>
        <button className="action-btn">📤 Share</button>
        <div className="reward-badge">🪙 +5 CGT</div>
      </div>
    </div>
  );
}
