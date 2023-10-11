import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

export const zkSyncNetwork = {
    url: "http://127.0.0.1:8011",
    ethNetwork: "http://127.0.0.1:8545",
    zksync: true,
}

const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      isSystem: true,
    },
  },
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      zksync: true,
    },
    zkSyncTestnet: zkSyncNetwork,
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
