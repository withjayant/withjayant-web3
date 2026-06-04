# 🚀 WithJayant — Blockchain Social Network

> *"No servers. No censorship. Just code and consensus."*

A fully decentralized social media platform built on **Ethereum Sepolia Testnet** where every post is minted as an NFT, every like is a transaction, and every user earns **CGT tokens** for engagement — all on-chain, forever! ⛓️

![Live](https://img.shields.io/badge/🟢_Live-withjayant--web3.vercel.app-brightgreen)
![Network](https://img.shields.io/badge/Network-Sepolia_Testnet-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?logo=solidity)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Hardhat](https://img.shields.io/badge/Hardhat-Framework-yellow)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## 🌐 Live Demo

### 👉 [https://withjayant-web3.vercel.app](https://withjayant-web3.vercel.app)

> Connect your MetaMask wallet on Sepolia Testnet to start posting on-chain!

---

## ✨ What Makes This Special?

Unlike Twitter or Instagram where a company **owns your data**, WithJayant stores everything on the **Ethereum blockchain**:

| Feature | Web2 (Twitter) | Web3 (WithJayant) |
|---|---|---|
| Data ownership | Company owns it | YOU own it |
| Post deletion | Company can delete | Impossible — on-chain forever |
| Censorship | Can be censored | Zero censorship |
| Rewards | None | Earn CGT tokens |
| Login | Email/password | MetaMask wallet |

---

## 🔥 Features

- 🔗 **Connect MetaMask** — login with your Ethereum wallet
- 👤 **Create Profile** — your identity stored permanently on-chain
- 📰 **Mint Posts as NFTs** — every post is a blockchain transaction
- ❤️ **Like Posts** — interactions recorded on-chain forever
- 🪙 **Earn CGT Tokens** — get rewarded for every post and interaction
- 💬 **Comment & Repost** — fully decentralized engagement
- 📊 **Live Network Stats** — real-time posts, users, transactions
- 🔍 **Explore Feed** — discover other users and their on-chain posts
- 📱 **Fully Responsive** — works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8.24 |
| Blockchain Network | Ethereum Sepolia Testnet |
| Dev Framework | Hardhat + ethers.js |
| Frontend | React.js |
| Wallet Integration | MetaMask + Web3 |
| Hosting | Vercel |
| Version Control | GitHub |

---

## 🔗 Smart Contract

| Detail | Info |
|---|---|
| Network | Ethereum Sepolia Testnet |
| Contract Address | `0xc92A9098e8E27bfa2E537F4Db6e875f49C2EeF57` |
| Etherscan | [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xc92A9098e8E27bfa2E537F4Db6e875f49C2EeF57) |
| Language | Solidity 0.8.24 |
| Token | CGT (Content Generation Token) |

---

## 📦 Project Structure

```
withjayant-web3/
├── contracts/
│   └── WithJayant.sol           # Main smart contract
├── scripts/
│   └── deploy.js                # Deployment script
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/          # Reusable UI components
│       ├── pages/
│       │   ├── LandingPage.js   # Home/welcome page
│       │   ├── FeedPage.js      # Main social feed
│       │   ├── ExplorePage.js   # Explore users & posts
│       │   ├── ProfilePage.js   # User profile page
│       │   └── RegisterPage.js  # On-chain registration
│       ├── context/             # React context (wallet state)
│       ├── utils/
│       │   ├── contract.json    # ABI + deployed address
│       │   └── helpers.js       # Utility functions
│       └── styles/              # Global CSS
├── hardhat.config.js            # Hardhat configuration
├── .env.example                 # Environment variables template
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MetaMask](https://metamask.io/) browser extension
- Sepolia test ETH → [Get free ETH here](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/withjayant/withjayant-web3.git
cd withjayant-web3
```

### 2️⃣ Install Dependencies
```bash
# Root (Hardhat)
npm install

# Frontend (React)
cd frontend
npm install
cd ..
```

### 3️⃣ Set Up Environment Variables
```bash
cp .env.example .env
```
Edit `.env`:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
```
> ⚠️ **Never share or commit your `.env` file!**

### 4️⃣ Compile & Deploy Contract
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### 5️⃣ Start Frontend
```bash
cd frontend
npm start
```
App runs at `http://localhost:3000` 🎉

---

## 💡 How to Use the Live App

1. Install **MetaMask** extension in your browser
2. Switch MetaMask to **Sepolia Testnet**
3. Get free Sepolia ETH from the [faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
4. Visit **[withjayant-web3.vercel.app](https://withjayant-web3.vercel.app)**
5. Click **"Connect Wallet"**
6. Create your on-chain profile
7. **Mint your first post** and earn CGT tokens! 🪙

---

## 🪙 CGT Token Economy

| Action | CGT Reward |
|---|---|
| Register profile | +10 CGT |
| Mint a post | +5 CGT |
| Get a like | +2 CGT |
| Comment | +1 CGT |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 👨‍💻 Developer

**Jayant Kumar**
- 🐙 GitHub: [@withjayant](https://github.com/withjayant)
- 🌐 Project: [WithJayant Blockchain Social](https://withjayant-web3.vercel.app)
- 💬 On-chain: `0xAE09...23E6` on Sepolia

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

*Built with ❤️ on Ethereum Sepolia by Jayant Kumar*

</div>
