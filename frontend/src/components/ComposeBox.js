import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { avatarColor, initials, toast } from "../utils/helpers";

export default function ComposeBox({ onPost }) {
  const { contract, address, user, refreshUser } = useWeb3();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [bg, fg] = avatarColor(address);

  const handlePost = async () => {
    if (!text.trim()) return;
    if (!user) { toast("Create a profile first!", "error"); return; }
    setPosting(true);
    try {
      const tokenURI = `data:application/json,{"name":"WithJayant Post","description":"${encodeURIComponent(text)}"}`;
      const tx = await contract.createPost(text, "", tokenURI);
      toast("Transaction sent...", "info");
      await tx.wait();
      setText("");
      toast("Post minted as NFT! +5 CGT 🎉", "success");
      await refreshUser();
      if (onPost) onPost();
    } catch (err) {
      toast(err.reason || "Failed to post", "error");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="compose-box">
      <div className="compose-avatar" style={{ background: bg, color: fg }}>
        {user ? initials(user.username) : "?"}
      </div>
      <div className="compose-right">
        <textarea
          className="compose-textarea"
          rows={3}
          placeholder="What's happening on-chain?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="compose-footer">
          <div className="compose-tools">
            <button className="tool-btn" title="Photo">📷</button>
            <button className="tool-btn" title="NFT">💎</button>
            <button className="tool-btn" title="Location">📍</button>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handlePost}
            disabled={posting || !text.trim()}
          >
            {posting ? <><span className="spinner" /> Minting...</> : "⛓️ Mint Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
