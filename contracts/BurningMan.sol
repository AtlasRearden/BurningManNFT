//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BurningMan is ERC721, Ownable {
    //-----------------State variables-----------------//
    // Mint price.
    uint256 public mintPrice;
    // Total supply.
    uint256 public totalSupply;
    // Max supply of the token.
    uint256 public maxSupply;
    // Max supply per wallet to hold.
    uint256 public maxPerWallet;
    // This will determine when owners can mint token.
    bool public isMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    // Keeps track of all the mints done by a wallet.
    mapping(address => uint256) public walletMints;

    //-----------------Constructor-----------------//
    constructor(
        address initialOwner
    ) payable ERC721("BurningMan", "BM") Ownable(initialOwner) {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 5;
    }

    //-----------------Owner of contract mint enable-----------------//
    function setIsMintEnabled(bool _isMintEnabled) external onlyOwner {
        isMintEnabled = _isMintEnabled;
    }

    //-----------------Owner of contract set base token-----------------//
    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    //-----------------Check if the token is already minted-----------------//
    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        require(ownerOf(_tokenId) != address(0), "Token does not exist");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    //-----------------Withdraw funds from contract to wallet-----------------//
    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success);
    }

    //-----------------Mint NFT public for enabled-----------------//
    function mint(uint256 _quantity) public payable {
        require(isMintEnabled, "Minting not enabled");
        require(msg.value == _quantity * mintPrice, "Incorrect mint value");
        require(totalSupply + _quantity <= maxSupply, "Token is sold out");
        require(
            walletMints[msg.sender] + _quantity <= maxPerWallet,
            "Exceeds max amount per wallet"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
