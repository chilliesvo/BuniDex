pragma solidity 0.8.18;

// DSProxyFactory
// This factory deploys new proxy instances through build()
// Deployed proxy addresses are logged

import "./DSProxyCache.sol";
import "./DSProxy.sol";

contract DSProxyFactory {
    event Created(address indexed sender, address indexed owner, address proxy, address cache);
    mapping(address => bool) public isProxy;
    DSProxyCache public cache = new DSProxyCache();

    // deploys a new proxy instance
    // sets owner of proxy to caller
    function build() public returns (DSProxy proxy) {
        proxy = build(msg.sender);
    }

    // deploys a new proxy instance
    // sets custom owner of proxy
    function build(address owner) public returns (DSProxy proxy) {
        proxy = new DSProxy(address(cache));
        emit Created(msg.sender, owner, address(proxy), address(cache));
        proxy.setOwner(owner);
        isProxy[address(proxy)] = true;
    }
}
