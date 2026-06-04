# 🚀 WithJayant — Blockchain Social Network

A fully decentralized social media platform built on **Ethereum Sepolia Testnet** where users can post, like, and earn **CGT tokens** — all on-chain!

![WithJayant](https://img.shields.io/badge/Network-Sepolia-blue) ![Solidity](https://img.shields.io/badge/Solidity-0.8.24-green) ![React](https://img.shields.io/badge/React-Frontend-61DAFB) ![Hardhat](https://img.shields.io/badge/Hardhat-Framework-yellow) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

---

## 🌐 Live Demo

👉 **[https://withjayant-web3.vercel.app](https://withjayant-web3.vercel.app)**

---

## 📸 Features

- 🔗 **Connect MetaMask** wallet to interact with the app
- 📝 **Create Profile** — stored permanently on-chain
- 📰 **Post Content** — every post is a blockchain transaction
- ❤️ **Like Posts** — interactions recorded on-chain
- 🪙 **Earn CGT Tokens** — rewarded for engagement
- 📊 **Live Network Stats** — posts, users, transactions in real time
- 🔍 **Explore Feed** — discover other users and posts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8.24 |
| Blockchain | Ethereum Sepolia Testnet |
| Development Framework | Hardhat |
| Frontend | React.js |
| Wallet | MetaMask |
| Hosting | Vercel |
| Version Control | GitHub |

---

## 📦 Project Structure

```
withjayant-web3/
├── contracts/
│   └── WithJayant.sol        # Main smart contract
├── scripts/
│   └── deploy.js             # Deployment script
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # App pages
│       │   ├── LandingPage.js
│       │   ├── FeedPage.js
│       │   ├── ExplorePage.js
│       │   ├── ProfilePage.js
│       │   └── RegisterPage.js
│       ├── context/          # React context
│       ├── utils/
│       │   ├── contract.json # ABI + deployed address
│       │   └── helpers.js
│       └── styles/
├── hardhat.config.js
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MetaMask](https://metamask.io/) browser extension
- Sepolia test ETH ([Get free ETH here](https://cloud.google.com/application/web3/faucet/ethereum/sepolia))

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/withjayant/withjayant-web3.git
cd withjayant-web3
```

### 2️⃣ Install Dependencies
```bash
# Root dependencies (Hardhat)
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 3️⃣ Set Up Environment Variables
```bash
cp .env.example .env
```
Fill in your `.env` file:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
```
> ⚠️ **Never share or commit your `.env` file!**

### 4️⃣ Compile the Contract
```bash
npx hardhat compile
```

### 5️⃣ Deploy to Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 6️⃣ Start the Frontend
```bash
cd frontend
npm start
```

App runs at: `http://localhost:3000`

---

## 🔗 Smart Contract

- **Network:** Ethereum Sepolia Testnet
- **Contract Address:** `0xc92A9098e8E27bfa2E537F4Db6e875f49C2EeF57`
- **View on Etherscan:** [Sepolia Etherscan](https://sepolia.etherscan.io/address/0xc92A9098e8E27bfa2E537F4Db6e875f49C2EeF57)

---

## 💡 How to Use

1. Install **MetaMask** and switch to **Sepolia Testnet**
2. Get free Sepolia ETH from the [faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
3. Visit the [live app](https://withjayant-web3.vercel.app)
4. Click **"Connect Wallet"**
5. Create your profile
6. Start posting and earning CGT tokens!

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 👨‍💻 Developer

**Jayant Kumar**
- GitHub: [@withjayant](https://github.com/withjayant)
- Project: [WithJayant Blockchain Social](https://withjayant-web3.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repo if you found it helpful!**
