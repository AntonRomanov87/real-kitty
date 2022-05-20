// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealKittyNFT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;

    string private _baseURIvalue;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;
    
    bool public isMintActive                 = false;
    uint256 public constant MAX_SUPPLY       = 100;
    uint256 public constant MAX_PUBLIC_MINT  = 3;
    uint256 public constant PRICE_PER_TOKEN  = 0.01 ether;


    constructor() ERC721("RealKittyNFT", "RKTN") {}

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseURIvalue = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIvalue;
    }

    function setIsMintActive(bool newState) public onlyOwner {
        isMintActive = newState;
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function mint(uint nNewTokens) public payable {
        require(isMintActive, "isMintActive must be active to mint new NFTs");
        require(nNewTokens <= MAX_PUBLIC_MINT, "Exceeded max token purchase");
        require(totalSupply() + nNewTokens <= MAX_SUPPLY, "Purchase would exceed max tokens supply");
        require(msg.value >= PRICE_PER_TOKEN * nNewTokens, "Ether value sent is not correct");
        require(walletMints[msg.sender] + nNewTokens <= MAX_PUBLIC_MINT, "Exceeded max per wallet");

        uint256 tokenId = _tokenIdCounter.current();
        for (uint256 i = 0; i < nNewTokens; i++) {
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            tokenId = _tokenIdCounter.current();
        }
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}('');
        require(success, 'withdraw failed');
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}