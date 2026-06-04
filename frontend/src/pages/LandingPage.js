import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";

export default function LandingPage() {
  const navigate = useNavigate();
  const { connect, loading } = useWeb3();
  const [activeTab, setActiveTab] = useState(0);

  const handleConnect = async () => {
    await connect();
    navigate("/feed");
  };

  const features = [
    { icon: "🛡️", title: "No Middleman",      desc: "Direct connection between you and your audience. No platform decides who sees your content.", color: "purple" },
    { icon: "🔒", title: "Privacy First",     desc: "Zero emails. Zero tracking. Zero surveillance. Your MetaMask wallet is your only identity.", color: "teal"   },
    { icon: "⟠",  title: "Ethereum Native",   desc: "Built on Ethereum — the world's most secure and battle-tested blockchain network.",         color: "blue"   },
    { icon: "🪙", title: "Earn CGT Tokens",   desc: "Get rewarded in real crypto every time you post, like, comment or follow others.",          color: "gold"   },
    { icon: "🔗", title: "Fully On-Chain",    desc: "Every post is a permanent NFT on Ethereum. Censorship-resistant by design.",               color: "pink"   },
    { icon: "🌐", title: "Decentralized",     desc: "No servers. No downtime. No data harvesting. The protocol runs itself.",                   color: "green"  },
    { icon: "🎨", title: "Post NFTs",         desc: "Each post you create is a collectible NFT you can trade, sell, or hold forever.",          color: "purple" },
    { icon: "👛", title: "Wallet Identity",   desc: "One wallet. One identity. No passwords to forget, no accounts to hack.",                   color: "teal"   },
    { icon: "🚫", title: "No Censorship",     desc: "Your content lives on-chain. No company, government or platform can remove it.",          color: "pink"   },
  ];

  const privacyPoints = [
    { icon: "🚫", label: "No cookies" },
    { icon: "🚫", label: "No ads" },
    { icon: "🚫", label: "No servers" },
    { icon: "🚫", label: "No tracking" },
    { icon: "🚫", label: "No emails" },
    { icon: "🚫", label: "No data selling" },
  ];

  const steps = [
    { n: "01", title: "Install MetaMask",   desc: "Download the MetaMask browser extension or mobile app — your Ethereum wallet.",  icon: "🦊" },
    { n: "02", title: "Connect Wallet",     desc: "Click Connect MetaMask. No signup form, no email, no password. Just one click.",   icon: "🔗" },
    { n: "03", title: "Create Profile",     desc: "Set your on-chain username and bio. It's stored on Ethereum forever.",             icon: "✍️" },
    { n: "04", title: "Post & Earn",        desc: "Start sharing. Every post mints an NFT and earns you CGT tokens automatically.",   icon: "🪙" },
  ];

  return (
    <div className="landing">
      <div className="landing-orb landing-orb-1" />
      <div className="landing-orb landing-orb-2" />
      <div className="landing-orb landing-orb-3" />

      {/* ── LOGO ── */}
      <div className="landing-logo-wrap">
        <div className="landing-logo-icon">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="17" stroke="url(#lg1)" strokeWidth="2" fill="none"/>
            <circle cx="20" cy="20" r="4.5" fill="url(#lg2)"/>
            <circle cx="20" cy="5.5" r="2.8" fill="#7C5CBF"/>
            <circle cx="32.5" cy="27.5" r="2.2" fill="#5DCAA5"/>
            <circle cx="7.5"  cy="27.5" r="1.8" fill="#D4537E"/>
            <line x1="20" y1="8.3" x2="20" y2="15.5" stroke="#7C5CBF" strokeWidth="1.2" strokeDasharray="2 2"/>
            <line x1="30.5" y1="26" x2="24.5" y2="22" stroke="#5DCAA5" strokeWidth="1.2" strokeDasharray="2 2"/>
            <line x1="9.5" y1="26" x2="15.5" y2="22" stroke="#D4537E" strokeWidth="1.2" strokeDasharray="2 2"/>
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7C5CBF"/><stop offset="1" stopColor="#5DCAA5"/>
              </linearGradient>
              <linearGradient id="lg2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9B7FE0"/><stop offset="1" stopColor="#5DCAA5"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="landing-logo-text">WithJayant</div>
      </div>

      {/* ── HERO ── */}
      <div className="landing-eth-chip">⟠ Powered by Ethereum &nbsp;·&nbsp; 🦊 MetaMask</div>
      <h1 className="landing-headline">Your voice,<br/>no middleman.</h1>
      <p className="landing-sub">
        The first fully decentralized social platform on Ethereum.<br/>
        No emails. No tracking. No censorship.<br/>
        <strong style={{color:"#c4b0ff"}}>You own your identity. You own your content.</strong>
      </p>

      {/* ── BADGES ── */}
      <div className="landing-badges">
        <span className="landing-badge badge-purple">🔒 Privacy-first</span>
        <span className="landing-badge badge-blue">⟠ Ethereum</span>
        <span className="landing-badge badge-teal">🌐 Fully on-chain</span>
        <span className="landing-badge badge-gold">🪙 Earn CGT</span>
      </div>

      {/* ── CTA ── */}
      <div className="landing-cta-group">
        <button className="btn btn-gradient" onClick={handleConnect} disabled={loading}>
          {loading ? <><span className="spinner" /> Connecting…</> : <>🦊 Connect MetaMask</>}
        </button>
        <button className="btn btn-glass" onClick={() => navigate("/feed")}>
          👀 Explore Feed
        </button>
      </div>
      <p className="landing-cta-note">MetaMask required. &nbsp;<a href="https://metamask.io" target="_blank" rel="noreferrer" className="landing-link">Download here →</a></p>

      {/* ── PRIVACY STRIP ── */}
      <div className="landing-privacy-strip">
        {privacyPoints.map(p => (
          <span key={p.label} className="privacy-item">{p.icon} {p.label}</span>
        ))}
      </div>

      {/* ── PRIVACY CALLOUT ── */}
      <div className="landing-privacy-box">
        <div className="privacy-box-icon">🔒</div>
        <div className="privacy-box-body">
          <div className="privacy-box-title">Your Privacy is Non-Negotiable</div>
          <p className="privacy-box-desc">
            WithJayant never stores your data on any server. Every interaction — posts, likes, follows — lives exclusively on the Ethereum blockchain. No company can access, sell, or delete your data. Your MetaMask wallet is the only key that matters.
          </p>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="landing-section-label" style={{width:"100%", maxWidth:720}}>How it works</div>
      <div className="steps-grid">
        {steps.map(s => (
          <div className="step-card" key={s.n}>
            <div className="step-num">{s.n}</div>
            <div className="step-icon">{s.icon}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <div className="landing-section-label" style={{width:"100%", maxWidth:720}}>Why WithJayant</div>
      <div className="feature-grid">
        {features.map(f => (
          <div className={`feature-card feature-card-${f.color}`} key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* ── ETH INFO STRIP ── */}
      <div className="landing-eth-strip">
        <div className="eth-strip-item"><span className="eth-strip-val">⟠ ETH</span><span className="eth-strip-label">Blockchain</span></div>
        <div className="eth-strip-divider"/>
        <div className="eth-strip-item"><span className="eth-strip-val">🦊</span><span className="eth-strip-label">MetaMask Auth</span></div>
        <div className="eth-strip-divider"/>
        <div className="eth-strip-item"><span className="eth-strip-val">NFT</span><span className="eth-strip-label">Every Post</span></div>
        <div className="eth-strip-divider"/>
        <div className="eth-strip-item"><span className="eth-strip-val">CGT</span><span className="eth-strip-label">Reward Token</span></div>
      </div>

      {/* ── FOOTER ── */}
      <div className="landing-footer">
        Built with Solidity · Hardhat · React · ethers.js · Ethereum &nbsp;|&nbsp; No cookies · No ads · No servers
      </div>
    </div>
  );
}
