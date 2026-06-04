import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import contractData from "../utils/contract.json";

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [provider,  setProvider]  = useState(null);
  const [signer,    setSigner]    = useState(null);
  const [contract,  setContract]  = useState(null);
  const [address,   setAddress]   = useState(null);
  const [user,      setUser]      = useState(null);
  const [network,   setNetwork]   = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      window.open("https://metamask.io", "_blank");
      return;
    }
    setLoading(true);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer   = await _provider.getSigner();
      const _address  = await _signer.getAddress();
      const _network  = await _provider.getNetwork();
      const _contract = new ethers.Contract(contractData.address, contractData.abi, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setAddress(_address);
      setNetwork(_network);
      setContract(_contract);
      setConnected(true);

      // Load user profile
      const profile = await _contract.getUser(_address);
      if (profile.exists) setUser(profile);

    } catch (err) {
      console.error("Connect error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!contract || !address) return;
    const profile = await contract.getUser(address);
    if (profile.exists) setUser(profile);
  }, [contract, address]);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.request({ method: "eth_accounts" }).then(accounts => {
      if (accounts.length > 0) connect();
    });
    window.ethereum.on("accountsChanged", () => window.location.reload());
    window.ethereum.on("chainChanged",    () => window.location.reload());
  }, [connect]);

  return (
    <Web3Context.Provider value={{
      provider, signer, contract, address, user,
      network, loading, connected, connect, refreshUser, setUser
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
