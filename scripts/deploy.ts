import { ethers } from "hardhat";
import { GWADA__factory, GWADA } from "../typechain-types";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  //connecting my account
  const options = { alchemy: process.env.ALCHEMY_TOKEN };
  const provider = ethers.getDefaultProvider("goerli", options);
  const signer = new ethers.Wallet(process.env.MY_PRIVATE_KEY!, provider);

  //getting my contract and deploying
  const myNFTFactory = (await ethers.getContractFactory(
    "GWADA"
  )) as GWADA__factory;

  const myNFT = (await myNFTFactory.connect(signer).deploy()) as GWADA;
  await myNFT.deployed();

  //getting the contract address
  console.log(`My contract was deployed at ${myNFT.address} address`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
