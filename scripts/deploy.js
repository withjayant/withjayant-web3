const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n🚀 Deploying WithJayant...");
  console.log("   Account:", deployer.address);

  const WithJayant = await ethers.getContractFactory("WithJayant");
  const contract = await WithJayant.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("   ✅ Deployed at:", address);

  // Save address + ABI to frontend
  const artifact = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../artifacts/contracts/WithJayant.sol/WithJayant.json")
    )
  );

  const out = {
    address,
    abi: artifact.abi,
    network: network.name,        // ✅ FIXED: was hardcoded "localhost"
    chainId: network.config.chainId ?? null,   // ✅ NEW: saves chain ID
    deployedAt: new Date().toISOString()
  };

  const outPath = path.join(__dirname, "../frontend/src/utils/contract.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log("   💾 ABI + address saved to frontend/src/utils/contract.json");
  console.log("   🌐 Network:", network.name);
  console.log("\n✨ Done! Contract:", address, "\n");
}

main().catch(err => { console.error(err); process.exit(1); });