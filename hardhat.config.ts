import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

export const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      isSystem: true,
    },
  },
  defaultNetwork: "zkSyncLocalnet",
  networks: {
    hardhat: {
      zksync: true,
    },
    zkSyncLocalnet: {
      url: "http://127.0.0.1:8011",
      ethNetwork: "http://127.0.0.1:8545",
      zksync: true,
  },
    zkSyncTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
    }
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
