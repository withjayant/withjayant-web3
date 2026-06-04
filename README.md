# WithJayant — Blockchain Social Media 🚀

A fully decentralized social media app built on Ethereum.
Every post is minted as an NFT. Earn CGT tokens for posting, liking & following.

## 📁 Project Structure

```
withjayant/
├── contracts/              ← Solidity smart contracts
│   └── WithJayant.sol      ← Main contract (ERC721 + Social)
├── scripts/                ← Deployment scripts
│   └── deploy.js           ← Deploy & save ABI to frontend
├── test/                   ← Contract tests
│   └── WithJayant.test.js
├── frontend/               ← React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     ← Reusable UI components
│   │   │   ├── Sidebar.js
│   │   │   ├── PostCard.js
│   │   │   ├── ComposeBox.js
│   │   │   └── RightSidebar.js
│   │   ├── pages/          ← Full page screens
│   │   │   ├── LandingPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── FeedPage.js
│   │   │   ├── ExplorePage.js
│   │   │   └── ProfilePage.js
│   │   ├── context/
│   │   │   └── Web3Context.js  ← Wallet + contract state
│   │   ├── utils/
│   │   │   ├── contract.json   ← Auto-generated after deploy
│   │   │   └── helpers.js      ← Utility functions
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── hardhat.config.js
├── package.json
└── .env.example
```

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start local blockchain (Terminal 1)
```bash
npm run chain
# or: npx hardhat node
```

### 3. Deploy contracts (Terminal 2)
```bash
npm run deploy
# or: npx hardhat run scripts/deploy.js --network localhost
```

### 4. Start frontend (Terminal 3)
```bash
cd frontend
npm install
npm start
```

### 5. Open browser
Go to: http://localhost:3000

## 🦊 MetaMask Setup
1. Add network: RPC = http://127.0.0.1:8545, Chain ID = 31337
2. Import Account #0 private key from hardhat node output
3. You have 10,000 test ETH!

## 🌐 Deploy to Sepolia Testnet
1. Copy `.env.example` to `.env`
2. Fill in your keys
3. Run: `npx hardhat run scripts/deploy.js --network sepolia`

## 🏗️ Smart Contract Features
- ✅ Register profile (stored on-chain)
- ✅ Create posts (minted as ERC-721 NFTs)
- ✅ Like / Unlike posts
- ✅ Follow / Unfollow users
- ✅ CGT token rewards for all actions
