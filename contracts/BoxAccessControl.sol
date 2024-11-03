// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract BoxAccessControl {
    mapping(uint => address) public boxAddresses; // Map box numbers to addresses

    constructor() public {
        // Initialize box addresses (replace with actual addresses)
        boxAddresses[1] = 0xA0dc7953e97400289658097d2c39A29855699279; // Box 1 Address
        boxAddresses[2] = 0x1CF33FF26A59d66BaeD9A58F80A5EE46875F6e1B; // Box 2 Address
        boxAddresses[3] = 0x2ac6318a1eF64808259772729E5574372231e19e; // Box 3 Address
        boxAddresses[4] = 0xa878214F648750FE1b8E28416a2356b08dDF3fCD; // Box 4 Address
        boxAddresses[5] = 0x1F1484112b51b187CAA89D4023B9202942F2dbFe; // Box 5 Address
        boxAddresses[6] = 0x3135BE878b3a0CE324dC5654fbbb384b69937d90; // Box 6 Address
        boxAddresses[7] = 0x1FCB2BC155beB9B0c419F15Ea1b6Bf275db9515F; // Box 7 Address
    }

    function isAuthorized(uint boxNumber, address _address) public view returns (bool) {
        return boxAddresses[boxNumber] == _address;
    }
}