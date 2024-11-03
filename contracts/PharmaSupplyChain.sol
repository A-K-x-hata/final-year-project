pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract PharmaSupplyChain {
    mapping(address => bool) public admins;

    constructor() public {
        // Initialize admin addresses
        admins[0x7f0Bc6FF531F0A764a7B6dD2B39808F934A2d645] = true; // Admin1
        admins[0xC1eC35086dD78223b5152058ACFEdc3B40e6e6A2] = true; // Admin2
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }
    function isAdmin(address _address) public view returns (bool) {
        return admins[_address];
    }

    // Example admin function
    function adminFunction() public onlyAdmin {
        // Admin specific functionality
    }

}