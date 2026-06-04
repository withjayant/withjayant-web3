import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import { shortAddr, toast } from "../utils/helpers";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { contract, address, connected, connect, refreshUser } = useWeb3();
  const [username, setUsername] = useState("");
  const [bio,      setBio]      = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleRegister = async () => {
    if (!username.trim()) { toast("Username is required", "error"); return; }
    if (username.length < 2) { toast("Username too short", "error"); return; }
    setLoading(true);
    try {
      const tx = await contract.register(username, bio, "");
      toast("Transaction sent...", "info");
      await tx.wait();
      await refreshUser();
      toast("Profile created on-chain! 🎉", "success");
      navigate("/feed");
    } catch (err) {
      toast(err.reason || err.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!connected) return (
    <div className="register-page">
      <div className="register-card">
        <h2>🔗 Connect First</h2>
        <p>You need to connect your MetaMask wallet before creating a profile.</p>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }} onClick={connect}>
          🦊 Connect MetaMask
        </button>
      </div>
    </div>
  );

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>🚀 Create Profile</h2>
        <p>Connected as <strong style={{ color: "var(--accent)" }}>{shortAddr(address)}</strong>. Set up your on-chain identity.</p>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            placeholder="jayant_web3"
            value={username}
            onChange={e => setUsername(e.target.value)}
            maxLength={30}
          />
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
            2–30 chars · stored on-chain forever
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Bio <span style={{ textTransform: "none", fontWeight: 400 }}>(optional)</span></label>
          <textarea
            className="form-input"
            placeholder="Tell the blockchain who you are..."
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxLength={160}
            rows={3}
            style={{ resize: "none" }}
          />
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
            {160 - bio.length} characters remaining
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? <><span className="spinner" /> Registering on Sepolia...</>
            : "⛓️ Register on Sepolia →"
          }
        </button>

        <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
          This sends one transaction (~0.0001 ETH gas on Sepolia)
        </div>
      </div>
    </div>
  );
}