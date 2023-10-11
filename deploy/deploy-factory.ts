import { utils, Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Wallets } from "./config";
import { varsAddDeployedContract } from "./utils";

const CONTRACT_NAME = "AAFactory";
const MULTISIG_CONTRACT_NAME = "TwoUserMultiSig";
const NETWORK = process.env.NODE_ENV || "local";

export default async function (hre: HardhatRuntimeEnvironment) {
  // Private key of the account used to deploy
  const wallet = new Wallet(Wallets.richWallet1.privateKey);
  const deployer = new Deployer(hre, wallet);
  const factoryArtifact = await deployer.loadArtifact(CONTRACT_NAME);
  const aaArtifact = await deployer.loadArtifact(MULTISIG_CONTRACT_NAME);

  // Getting the bytecodeHash of the account
  const bytecodeHash = utils.hashBytecode(aaArtifact.bytecode);

  // Deploy the factory
  const factory = await deployer.deploy(
    factoryArtifact,
    [bytecodeHash],
    undefined,
    [
      // Since the factory requires the code of the multisig to be available,
      // we should pass it here as well.
      aaArtifact.bytecode,
    ],
  );

  console.log(`AA factory address: ${factory.address}`);

  // Save the deployed contract address to vars.json
  varsAddDeployedContract(NETWORK, CONTRACT_NAME, factory.address);
}