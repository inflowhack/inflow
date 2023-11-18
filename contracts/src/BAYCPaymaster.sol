// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./libs/PimlicoERC20PaymasterCustom.sol";

// @title BAYCPaymaster
// @notice A specialized ERC-4337 Paymaster contract for transactions involving the BAYC token.
contract BAYCPaymaster is PimlicoERC20PaymasterCustom {

    error NoBAYCFound();
    
    constructor(
        IERC20Metadata _token,
        IEntryPoint _entryPoint,
        IOracle _tokenOracle,
        IOracle _nativeAssetOracle
    ) PimlicoERC20PaymasterCustom(
        _token,
        _entryPoint,
        _tokenOracle,
        _nativeAssetOracle,
        msg.sender
    ) {}

    function _validatePaymasterUserOp(UserOperation calldata userOp, bytes32, uint256 requiredPreFund)
        internal
        override(PimlicoERC20PaymasterCustom)
        returns (bytes memory context, uint256 validationResult)
    {
        // Check has the required NFT (a Bored Ape Yacht Club NFT)
        if (IERC721(0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D).balanceOf(msg.sender) == 0)
            revert NoBAYCFound();
        return super._validatePaymasterUserOp(userOp, "", requiredPreFund);
    }
}
