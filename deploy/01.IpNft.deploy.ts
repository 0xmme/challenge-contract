import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";

import { THardhatRuntimeEnvironmentExtended } from "helpers/types/THardhatRuntimeEnvironmentExtended";
import { devChains, networkConfig } from "../helper-hardhat-config";

import verify from "../utils/verify/verify";

const func: DeployFunction = async (
  hre: THardhatRuntimeEnvironmentExtended
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args: any[] = [];
  const IpNft = await deploy("IpNft", {
    from: deployer,
    log: true,
    args: args,
  });

  if (!devChains.includes(network.name)) {
    log("------- verifying started --------");
    await verify(IpNft.address, args);
  }
};
export default func;
func.tags = ["IpNft"];
