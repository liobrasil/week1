import { ethers } from "hardhat";
import { GWADA__factory, GWADA } from "../typechain-types";
import dotenv from "dotenv";
dotenv.config();

const MY_NFT_SC_ADDRESS = "0x83e2A3B5ed0d1b76C5664584E3fEB6596bBa6441";
async function main() {
  //connecting my account
  const options = { alchemy: process.env.ALCHEMY_TOKEN };
  const provider = ethers.getDefaultProvider("goerli", options);
  const signer = new ethers.Wallet(process.env.MY_PRIVATE_KEY!, provider);

  //getting my contract and deploying
  const myNFTFactory = (await ethers.getContractFactory(
    "GWADA"
  )) as GWADA__factory;

  const myNFT = myNFTFactory.connect(signer).attach(MY_NFT_SC_ADDRESS) as GWADA;
  const tx = await myNFT.safeMint(
    signer.address,
    "ipfs://QmVKRwSVQFfgDuBYeFu8oScFjBuQRQLD5kx9zXYYiXiiY2"
  );

  const receipt = await tx.wait();

  console.log(receipt);

  const myTokenId = await myNFT.balanceOf(signer.address);

  //getting the contract address
  console.log(`NFT ${myTokenId} successfully minted`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
