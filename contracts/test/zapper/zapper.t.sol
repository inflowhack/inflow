// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/console.sol";
import "forge-std/Test.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../src/zapper.sol";


struct Swap {
    address router;
    IERC20 tokenIn;
    IERC20 tokenOut;
    uint256 amount;
    uint256 minAmount;
    address tokenInWhale;
    uint256 slippage;
}

contract OffChainCalls is Test {
    address constant _router = 0x1111111254EEB25477B68fb85Ed929f73A960582;

    ERC20 internal immutable _APE = ERC20(vm.envAddress("APE_MAINNET"));
    ERC20 internal immutable _DAI = ERC20(vm.envAddress("DAI_MAINNET"));
    ERC20 internal immutable _USDC = ERC20(vm.envAddress("USDC_MAINNET"));
    ERC20 internal immutable _USDT = ERC20(vm.envAddress("USDT_MAINNET"));
    ERC20 internal immutable _WETH = ERC20(vm.envAddress("WETH_MAINNET"));
    ERC20 internal immutable _ETH = ERC20(vm.envAddress("ETH_MAINNET"));
    ERC20 internal immutable _WSTETH = ERC20(vm.envAddress("WSTETH_MAINNET"));
    ERC20 internal immutable _STETH = ERC20(vm.envAddress("STETH_MAINNET"));
    ERC20 internal immutable _WBTC = ERC20(vm.envAddress("WBTC_MAINNET"));

    constructor() {}

    function _getSwapData(address from, address to, Swap memory swap)
        public
        returns (bytes memory)
    {
        string[] memory inputs = new string[](8);
        inputs[0] = "node";
        inputs[1] = "./test/scripts/get1inchQuote.js";
        inputs[2] = vm.toString(from);
        inputs[3] = vm.toString(to);
        inputs[4] = vm.toString(address(swap.tokenIn));
        inputs[5] = vm.toString(address(swap.tokenOut));
        inputs[6] = vm.toString(swap.amount);
        inputs[7] = vm.toString(swap.slippage);

        bytes memory res = vm.ffi(inputs);

        return res;
    }
}

contract SigUtils {
    bytes32 internal DOMAIN_SEPARATOR;

    constructor(bytes32 _DOMAIN_SEPARATOR) {
        DOMAIN_SEPARATOR = _DOMAIN_SEPARATOR;
    }

    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH =
        0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;

    struct Permit {
        address owner;
        address spender;
        uint256 value;
        uint256 nonce;
        uint256 deadline;
    }

    // computes the hash of a permit
    function getStructHash(Permit memory _permit)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(
            abi.encode(
                PERMIT_TYPEHASH,
                _permit.owner,
                _permit.spender,
                _permit.value,
                _permit.nonce,
                _permit.deadline
            )
        );
    }

    // computes the hash of the fully encoded EIP-712 message for the domain, which can be used to recover the signer
    function getTypedDataHash(Permit memory _permit)
        public
        view
        returns (bytes32)
    {
        return keccak256(
            abi.encodePacked(
                "\x19\x01", DOMAIN_SEPARATOR, getStructHash(_permit)
            )
        );
    }
}

contract ZapperTest is OffChainCalls {
    Zapper zapper;
    SigUtils internal sigUtils;
    // uint256 userPrivateKey = _usersPk[0];
    // address user = _users[0];

    using SafeERC20 for IERC20;

    function setUp() public {
        zapper = new Zapper();
    }

    function test_failZapAndDoSomethingERC20PlusEth() public {
        Swap memory usdcToWstEth =
            Swap(_router, _USDC, _WSTETH, 1500 * 1e6, 1, address(0), 30);
        _failZapAndDoSomething_eth(usdcToWstEth, 1500 * 1e6);
    }

    function test_zapAndDoSomethingEthAPE() public {
        Swap memory ethToWstEth =
            Swap(_router, _ETH, _APE, 1e18, 1, address(0), 200);
        _zapAndDoSomething_eth(ethToWstEth);
    }

    function test_inconsistantZapAndDoSomethingEthAPE() public {
        Swap memory ethToApe = Swap(
            _router, IERC20(_ETH), IERC20(_APE), 1e18, 1, address(0), 10000
        );
        _failZapAndDoSomething_eth(ethToApe, 2e18);
    }

    function _zapAndDoSomething(Swap memory params) public {
        bytes memory swapData =
            _getSwapData(address(zapper), address(zapper), params);
        _setUpVaultAndZapper();
        _getTokenIn(params);
        if (keccak256(swapData) == keccak256(hex"")) vm.expectRevert();
        zapper.zapAndDoSomething(
            params.tokenIn,
            params.tokenOut,
            params.router,
            params.amount,
            swapData
        );
    }

    function _failZapAndDoSomething(Swap memory params, uint256 amount) public {
        bytes memory swapData =
            _getSwapData(address(zapper), address(zapper), params);
        _setUpVaultAndZapper();
        _getTokenIn(params);
        vm.expectRevert();
        zapper.zapAndDoSomething(
            params.tokenIn,
            params.tokenOut,
            params.router,
            amount,
            swapData
        );
    }

    function _zapAndDoSomething_eth(Swap memory params) public {
        bytes memory swapData =
            _getSwapData(address(zapper), address(zapper), params);
        _setUpVaultAndZapper();
        _getTokenIn(params);
        if (keccak256(swapData) == keccak256(hex"")) vm.expectRevert();
        zapper.zapAndDoSomething{value: params.amount}(
            params.tokenIn, 
            params.tokenOut, 
            params.router, 
            params.amount,
            swapData
        );
    }

    function _failZapAndDoSomething_eth(Swap memory params, uint256 amount)
        public
    {
        bytes memory swapData = _getSwapData(address(zapper), address(zapper), params);
        _setUpVaultAndZapper();
        _getTokenIn(params);
        vm.expectRevert();
        zapper.zapAndDoSomething{value: amount}(
            params.tokenIn, 
            params.tokenOut,
            params.router,
            params.amount,
            swapData
        );
    }

    function test_fail_zapAndDoSomething_RouterFails() public {
        Swap memory params = Swap(
            _router,
            IERC20(_USDC),
            IERC20(_WSTETH),
            1500 * 1e6,
            type(uint256).max,
            address(0),
            100
        );
        bytes memory swapData = _getSwapData(address(zapper), address(zapper), params);
        if (keccak256(swapData) != keccak256(hex"")) swapData[0] = hex"00";
        _setUpVaultAndZapper();
        _getTokenIn(params);
        uint256 beforeDepTokenIn =
            (IERC20(address(params.tokenIn)).balanceOf(address(this)));

        uint256 value = params.tokenIn == IERC20(_ETH) ? params.amount : 0;
        vm.expectRevert();
        zapper.zapAndDoSomething{value: value}(
            params.tokenIn,
            params.tokenOut,
            params.router,
            params.amount,
            swapData
        );
        uint256 afterDepTokenIn =
            (IERC20(address(params.tokenIn)).balanceOf(address(this)));
        assertTrue(afterDepTokenIn == beforeDepTokenIn, "Zap failed");
    }

    function _setUpVaultAndZapper(/*IERC20 asset*/) public {
        if (!zapper.authorizedRouters(_router)) {
            zapper.toggleRouterAuthorization(_router);
        }
        //zapper.approveTokenForRouter(asset, _router);
    }

    function _getTokenIn(Swap memory params) public {
        if (params.tokenIn != _ETH) {
            if (params.tokenInWhale == address(0)) {
                deal(address(params.tokenIn), address(this), 1000 * 1e18);
            } else {
                vm.prank(params.tokenInWhale);
                SafeERC20.safeTransfer(
                    params.tokenIn, address(this), 1000 * 1e18
                );
            }
            SafeERC20.forceApprove(
                IERC20(params.tokenIn), address(zapper), type(uint256).max
            );
        }
        deal(address(this), 1000 * 1e18);
    }
}
