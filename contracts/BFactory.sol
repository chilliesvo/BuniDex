// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is disstributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity 0.8.18;

// Builds new KPools, logging their addresses and providing `isBPool(address) -> (bool)`

import "./BPool.sol";

contract BFactory {
    event LOG_NEW_POOL(address indexed caller, address indexed pool);

    event LOG_BLABS(address indexed caller, address indexed klabs);

    mapping(address => bool) private _isBPool;

    function isBPool(address b) external view returns (bool) {
        return _isBPool[b];
    }

    function newBPool() external returns (BPool) {
        BPool kpool = new BPool();
        _isBPool[address(kpool)] = true;
        emit LOG_NEW_POOL(msg.sender, address(kpool));
        kpool.setController(msg.sender);
        return kpool;
    }

    address private _blabs;

    constructor() {
        _blabs = msg.sender;
    }

    function getBLabs() external view returns (address) {
        return _blabs;
    }

    function setBLabs(address b) external {
        require(msg.sender == _blabs, "ERR_NOT_blabs");
        emit LOG_BLABS(msg.sender, b);
        _blabs = b;
    }

    function collect(BPool pool) external {
        require(msg.sender == _blabs, "ERR_NOT_blabs");
        uint collected = IERC20(pool).balanceOf(address(this));
        bool xfer = pool.transfer(_blabs, collected);
        require(xfer, "ERR_ERC20_FAILED");
    }
}
