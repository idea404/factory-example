import fs from "fs";
import path from "path";

interface Config {
  [key: string]: {
    deployed: {
      name: string;
      address: string;
    }[];
  };
}

export function varsAddDeployedContract(
  network: string,
  contractName: string,
  factoryAddress: string
) {
  const JSON_FILE_PATH = path.join(__dirname, "vars.json");
  const config: Config = JSON.parse(fs.readFileSync(JSON_FILE_PATH, "utf-8"));

  if (!config[network]) {
    config[network] = { deployed: [] };
  }

  config[network].deployed.push({
    name: contractName,
    address: factoryAddress,
  });

  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(config, null, 2));
}

export function varsGetDeployedContractAddress(
  network: string,
  contractName: string
) {
  const JSON_FILE_PATH = path.join(__dirname, "vars.json");
  const config: Config = JSON.parse(fs.readFileSync(JSON_FILE_PATH, "utf-8"));

  if (!config[network]) {
    throw new Error(`Network ${network} not found in vars.json`);
  }

  const contract = config[network].deployed.find(
    (contract: { name: string }) => contract.name === contractName
  );

  if (!contract) {
    throw new Error(`Contract ${contractName} not found in vars.json`);
  }

  return contract.address;
}
