//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Ownable2Step} from
    "@openzeppelin/contracts/access/Ownable2Step.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {SafeERC20} from
    "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zapper is Ownable2Step, Pausable {
    /**
     * @dev The `SafeERC20` lib is only used for `safeTransfer`,
     * `safeTransferFrom` and `forceApprove` operations.
     */
    using SafeERC20 for IERC20;

    mapping(address => bool) public authorizedRouters;

    error NotRouter(address router);
    error SwapFailed(string reason);
    error InconsistantSwapData(
        uint256 expectedTokenInBalance, uint256 actualTokenInBalance
    );
    error NotEnoughUnderlying(
        uint256 previewedUnderlying, uint256 withdrawedUnderlying
    );
    error NoTokenOutReceived(
        uint256 tokenOutBalance,
        uint256 tokenInBalance
    );

    event ZapAndDoSomething(
        address indexed router,
        IERC20 tokenIn,
        uint256 amount
    );

    event routerApproved(address indexed router, IERC20 indexed token);
    event routerAuthorized(address indexed router, bool allowed);

    modifier onlyAllowedRouter(address router) {
        if (!authorizedRouters[router]) revert NotRouter(router);
        _;
    }

    /**
     * @dev The `claimToken` function is used to claim other tokens that have
     * been sent to the vault.
     * @notice The `claimToken` function is used to claim other tokens that have
     * been sent to the vault.
     * It can only be called by the owner of the contract (`onlyOwner` modifier).
     * @param token The IERC20 token to be claimed.
     */

    function withdrawToken(IERC20 token) external onlyOwner {
        token.safeTransfer(_msgSender(), token.balanceOf(address(this)));
    }

    function withdrawNativeToken() external onlyOwner {
        payable(_msgSender()).transfer(address(this).balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function approveTokenForRouter(IERC20 token, address router)
        public
        onlyOwner
    {
        token.forceApprove(address(router), type(uint256).max);
        emit routerApproved(address(router), token);
    }

    function toggleRouterAuthorization(address router) public onlyOwner {
        bool authorized = !authorizedRouters[router];
        authorizedRouters[router] = authorized;
        emit routerAuthorized(router, authorized);
    }

    function zapAndDoSomething(
        IERC20 tokenIn,
        IERC20 tokenOut,
        address router,
        uint256 amount,
        bytes calldata data
    )
        public
        payable
        onlyAllowedRouter(router)
        whenNotPaused
    {
        uint256 expectedBalance;

        if (msg.value == 0) {
            expectedBalance = tokenIn.balanceOf(address(this));
            _transferTokenInAndApprove(router, tokenIn, amount);
        } else {
            expectedBalance = address(this).balance - msg.value;
        }

        _execute(router, data); // zap

        uint256 balanceAfterZap = msg.value == 0
            ? tokenIn.balanceOf(address(this))
            : address(this).balance;

        if (balanceAfterZap > expectedBalance) {
            // Our balance is higher than expected, we shouldn't have received any token
            revert InconsistantSwapData({
                expectedTokenInBalance: expectedBalance,
                actualTokenInBalance: balanceAfterZap
            });
        }

        emit ZapAndDoSomething({
            router: router,
            tokenIn: tokenIn,
            amount: amount
        });
        if (tokenOut.balanceOf(address(this)) == 0) {
            revert NoTokenOutReceived(
                tokenOut.balanceOf(address(this)),
                address(this).balance
            );
        }
    }

    function _transferTokenInAndApprove(
        address router,
        IERC20 tokenIn,
        uint256 amount
    ) private {
        tokenIn.safeTransferFrom(_msgSender(), address(this), amount);
        if (tokenIn.allowance(_msgSender(), address(router)) < amount) {
            tokenIn.forceApprove(address(router), amount);
        }
    }

    function _execute(address target, bytes memory data)
        private
        returns (bytes memory response)
    {
        (bool success, bytes memory _data) = target.call{value: msg.value}(data);
        if (!success) {
            if (data.length > 0) revert SwapFailed(string(_data));
            else revert SwapFailed("Unknown reason");
        }
        return _data;
    }
}
