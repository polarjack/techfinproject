pragma solidity ^0.4.11;

contract Agreement {
    address public rent = 0x0;
    address public host = 0x0;
    address public item = 0x0;
    uint public initBlock;
    uint public createTime;

    function Agreement() public {
        initBlock = block.number;
        createTime = block.timestamp;
    }

    function showInit() public constant returns (uint) {
        return initBlock;
    }

    function showTime() public constant returns (uint) {
        return createTime;
    }

    function showCurrentTime() public constant returns (uint) {
        return block.timestamp;
    }

    function showCurrentBlock() public constant returns (uint) {
        return block.number;
    }
}