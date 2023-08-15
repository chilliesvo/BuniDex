pragma solidity 0.8.18;

// DSProxy
// Allows code execution using a persistant identity This can be very
// useful to execute a sequence of atomic actions. Since the owner of
// the proxy can be changed, this allows for dynamic ownership models
// i.e. a multisig

import "./DSAuth.sol";
import "./DSNote.sol";
import "./DSProxyCache.sol";

contract DSProxy is DSAuth, DSNote {
    DSProxyCache public cache; // global cache for contracts

    constructor(address _cacheAddr) {
        require(setCache(_cacheAddr));
    }

    receive() external payable {}

    // use the proxy to execute calldata _data on contract _code
    function execute(bytes memory _code, bytes memory _data) public payable returns (address target, bytes32 response) {
        target = cache.read(_code);
        if (target == address(0)) {
            // deploy contract & store its address in cache
            target = cache.write(_code);
        }

        response = execute(target, _data);
    }

    function execute(address _target, bytes memory _data) public payable auth note returns (bytes32 response) {
        require(_target != address(0));

        // call contract in current context
        assembly {
            let succeeded := delegatecall(sub(gas(), 5000), _target, add(_data, 0x20), mload(_data), 0, 32)
            response := mload(0) // load delegatecall output
            switch iszero(succeeded)
            case 1 {
                // throw if delegatecall failed
                revert(0, 0)
            }
        }
    }

    //set new cache
    function setCache(address _cacheAddr) public payable auth note returns (bool) {
        require(_cacheAddr != address(0)); // invalid cache address
        cache = DSProxyCache(_cacheAddr); // overwrite cache
        return true;
    }
}
//Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
