// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import {UserOperation} from "account-abstraction/interfaces/UserOperation.sol";
import {IEntryPoint} from "account-abstraction/interfaces/IEntryPoint.sol";
import {BasePaymaster} from "account-abstraction/core/BasePaymaster.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title BAYCPaymaster
/// @notice A specialized ERC-4337 Paymaster contract able to sponsor transactions only if the user own BAYC token.
/// and the receiver own a BAYC NFT.
contract BAYCPaymaster is BasePaymaster {
    IERC20 public baycToken;
    IERC721 public nftContract;
    uint256 public immutable tokenDecimals;

    /// @notice Initialize the BAYCPaymaster contract
    /// @param _entryPoint The address of the entry point contract

    constructor(
        IEntryPoint _entryPoint,
        address _nftContractAddress,
        address _baycTokenAddress, // BAYC ERC20 token contract address
        address _owner
    ) TokenPaymaster(_entryPoint) {
        nftContract = IERC721(_nftContractAddress);
        baycToken = IERC20(_baycTokenAddress);

        transferOwnership(_owner);
        tokenDecimals = 10 ** _token.decimals();
    }

    /// @notice Validates a paymaster user operation and calculates the required token amount for the transaction.
    /// @param userOp The user operation data.
    /// @param requiredPreFund The amount of tokens required for pre-funding.
    /// @return context The context containing the token amount and user sender address (if applicable).
    /// @return validationResult A uint256 value indicating the result of the validation (always 0 in this implementation).
    function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 requiredPreFund
    )
        internal
        view
        override
        returns (bytes memory context, uint256 validationData)
    {
        uint256 tokenPrefund = getTokenValueOfEth(requiredPreFund);
        require(
            baycToken.balanceOf(userOp.sender) >= tokenPrefund,
            "BAYCPaymaster: Insufficient BAYC balance"
        );
        return (abi.encode(userOp.sender), 0);
    }

    // Override _postOp to handle charging in BAYC tokens
    function _postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) internal override {
        address sender = abi.decode(context, (address));
        uint256 charge = getTokenValueOfEth(actualGasCost + COST_OF_POST);
        require(
            baycToken.transferFrom(sender, address(this), charge),
            "BAYCPaymaster: Failed to transfer BAYC tokens"
        );
    }
}
