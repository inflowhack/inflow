// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/AA/WalletFactory.sol";
import "../src/AA/Wallet.sol";
import "../src/Zapper.sol";
import {IEntryPoint} from "account-abstraction/interfaces/IEntryPoint.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./../src/AA/BAYCPaymaster.sol";

contract SmartDeploy is Script {
    IEntryPoint constant ENTRYPOINT =
        IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789);

    IERC20Metadata APE = IERC20Metadata(vm.envAddress("APE_MAINNET"));
    IOracle TOKEN_ORACLE = IOracle(vm.envAddress("CHAINLINK_APEUSD_MAINNET"));
    IOracle NATIVE_ASSET_ORACLE =
        IOracle(vm.envAddress("CHAINLINK_ETHUSD_MAINNET"));

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); // Fetch the private key from environment variables
        vm.startBroadcast(deployerPrivateKey); // Start broadcasting transactions

        Zapper zapper = new Zapper();
        new WalletFactory(ENTRYPOINT, zapper); // Initialize the WalletFactory contract

        vm.stopBroadcast(); // Stop broadcasting transactions
    }
}
