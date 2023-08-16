// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Pausable.sol";

/**
 * @dev {ERC721} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *  - token ID and URI autogeneration
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to other accounts.
 */
contract VBuniToken is Context, AccessControl, ERC721Burnable, ERC721Pausable {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    struct TokenInfo {
        uint256 pid;
        uint256 amount;
        uint256 vestedAt;
        uint256 createdAt;
    }

    mapping(uint256 => TokenInfo) public vestedData;

    Counters.Counter private _tokenIdTracker;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
     * account that deploys the contract.
     *
     * Token URIs will be autogenerated based on `baseURI` and their token IDs.
     * See {ERC721-tokenURI}.
     */
    constructor() public ERC721("Vested Buni", "vBuni") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());

        _setBaseURI("https://nft.buni.finance/tokens/");
    }

    function getTokenInfo(uint256 tokenId) public view returns (uint256, uint256, uint256, uint256) {
        TokenInfo memory info = vestedData[tokenId];

        return (info.pid, info.amount, info.vestedAt, info.createdAt);
    }

    /**
     * @dev Creates a new token for `to`. Its token ID will be automatically
     * assigned (and available on the emitted {IERC721-Transfer} event), and the token
     * URI autogenerated based on the base URI passed at construction.
     *
     * See {ERC721-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 poolId, uint256 buniAmount, uint256 vestedTimestamp) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "VBuni: must have minter role to mint");

        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        _mint(to, _tokenIdTracker.current());
        vestedData[_tokenIdTracker.current()] = TokenInfo({
            pid: poolId,
            amount: buniAmount,
            vestedAt: vestedTimestamp,
            createdAt: block.timestamp
        });
        _tokenIdTracker.increment();
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "VBuni: must have pauser role to pause");
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "VBuni: must have pauser role to unpause");
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function setBaseURI(string memory baseURI) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "VBuni: must have pauser role to set baseURI");
        _setBaseURI(baseURI);
    }

    function getTokenInfoOfOwnerByIndex(
        address owner,
        uint256 index
    ) public view returns (uint256 poolId, uint256 amount, uint256 vestedAt, uint256 tokenId) {
        uint256 tokenId = tokenOfOwnerByIndex(owner, index);
        (poolId, amount, vestedAt, ) = getTokenInfo(tokenId);
        return (poolId, amount, vestedAt, tokenId);
    }
}