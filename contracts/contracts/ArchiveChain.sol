// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArchiveChain is ERC721Enumerable, Ownable {
    struct NFTMetadata {
        string ipfsHash;
        string fileHash;
        string fileName;
        uint256 fileSizeKB;
        string keys;
        string values;
        mapping(string => string) tags;
    }

    mapping(uint256 => NFTMetadata) public nftMetadata;

    constructor() ERC721("ArchiveChain", "ARCHAIN") {
        // Constructor
    }

    function createNFT(
        string memory _ipfsHash,
        string memory _fileHash,
        string memory _fileName,
        uint256 _fileSizeKB,
        string[] memory _tagKeys,
        string[] memory _tagValues
    ) external onlyOwner {
        require(_tagKeys.length == _tagValues.length, "Tag key-value mismatch");
        uint256 tokenId = totalSupply();
        _mint(msg.sender, tokenId);
        NFTMetadata storage metadata = nftMetadata[tokenId];
        metadata.ipfsHash = _ipfsHash;
        metadata.fileHash = _fileHash;
        metadata.fileName = _fileName;
        metadata.fileSizeKB = _fileSizeKB;
        for (uint256 i = 0; i < _tagKeys.length; i++) {
            metadata.keys = string(abi.encodePacked(metadata.keys, _tagKeys[i], ";"));
            metadata.values = string(abi.encodePacked(metadata.values, _tagValues[i], ";"));
            metadata.tags[_tagKeys[i]] = _tagValues[i];
        }
    }

    // Función para buscar un token dado un par de KeyTag y KeyValue
    function findTokenByTag(string memory key, string memory value) external view returns (uint256[] memory) {
        uint256 totalTokens = totalSupply();
        uint256[] memory matchingTokens = new uint256[](totalTokens);
        uint256 count = 0;

        for (uint256 tokenId = 0; tokenId < totalTokens; tokenId++) {
            if (keccak256(bytes(nftMetadata[tokenId].tags[key])) == keccak256(bytes(value))) {
                matchingTokens[count] = tokenId;
                count++;
            }
        }

        // Crear un nuevo array de tamaño correcto para los tokens encontrados
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = matchingTokens[i];
        }

        return result;
    }

    // Función para buscar un token por el nombre
    function findTokenByName(string memory name) external view returns (uint256[] memory) {
        uint256 totalTokens = totalSupply();
        uint256[] memory matchingTokens = new uint256[](totalTokens);
        uint256 count = 0;

        for (uint256 tokenId = 0; tokenId < totalTokens; tokenId++) {
            if (keccak256(bytes(nftMetadata[tokenId].fileName)) == keccak256(bytes(name))) {
                matchingTokens[count] = tokenId;
                count++;
            }
        }

        // Crear un nuevo array de tamaño correcto para los tokens encontrados
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = matchingTokens[i];
        }

        return result;
    }

    // Función para buscar un token por una parte del nombre
    function findTokensByPartialName(string memory partialName) external view returns (uint256[] memory) {
        uint256 totalTokens = totalSupply();
        uint256[] memory matchingTokens = new uint256[](totalTokens);
        uint256 count = 0;

        for (uint256 tokenId = 0; tokenId < totalTokens; tokenId++) {
            string memory tokenName = nftMetadata[tokenId].fileName;
            if (contains(tokenName, partialName)) {
                matchingTokens[count] = tokenId;
                count++;
            }
        }

        // Crear un nuevo array de tamaño correcto para los tokens encontrados
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = matchingTokens[i];
        }

        return result;
    }

    // Función para verificar si una cadena contiene otra cadena (insensible a mayúsculas y minúsculas)
    function contains(string memory haystack, string memory needle) internal pure returns (bool) {
        bytes memory h = bytes(haystack);
        bytes memory n = bytes(needle);

        if (h.length < n.length) return false;

        for (uint256 i = 0; i <= h.length - n.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < n.length; j++) {
                if (h[i + j] != n[j]) {
                    found = false;
                    break;
                }
            }
            if (found) return true;
        }

        return false;
    }
}
