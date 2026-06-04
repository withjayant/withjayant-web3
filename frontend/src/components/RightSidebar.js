import React, { useState, useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";

export default function RightSidebar() {
  const { contract, user, address } = useWeb3();
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [txLog, setTxLog] = useState([]);

  useEffect(() => {
    if (!contract) return;
    contract.getTotalPosts().then(v => setTotalPosts(Number(v))).catch(() => {});
    contract.getTotalUsers().then(v => setTotalUsers(Number(v))).catch(() => {});
  }, [contract]);

  const addTx = (action, reward) => {
    setTxLog(prev => [{ action, reward, time: "just now" }, ...prev.slice(0, 4)]);
  };

  const tags = ["#Web3", "#NFT", "#DeFi", "#Ethereum", "#IPFS", "#Solidity", "#DAO", "#Crypto"];

  return (
    <aside className="right-panel">
      {/* Stats */}
      <div className="panel-card">
        <div className="panel-title">Network Stats</div>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-num">{totalPosts}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{totalUsers}</div>
            <div className="stat-label">Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-num" style={{ color: "var(--accent2)" }}>
              {user ? user.tokens.toString() : 0}
            </div>
            <div className="stat-label">CGT</div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="panel-card">
        <div className="panel-title">Live Transactions</div>
        {txLog.length === 0 ? (
          <div style={{ color: "var(--muted)", fontSize: 13 }}>No transactions yet</div>
        ) : txLog.map((tx, i) => (
          <div className="tx-row" key={i}>
            <div className="tx-action">{tx.action}</div>
            <div className="tx-reward">{tx.reward}</div>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div className="panel-card">
        <div className="panel-title">Trending</div>
        <div className="tag-cloud">
          {tags.map(t => <span className="hash-tag" key={t}>{t}</span>)}
        </div>
      </div>

      {/* About */}
      <div className="panel-card">
        <div className="panel-title">About</div>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
          WithJayant is a fully decentralized social network. Every post is minted as an NFT. No servers, no censorship.
        </p>
        <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
          Built with Solidity · Hardhat · React · ethers.js
        </div>
      </div>
    </aside>
  );
}
