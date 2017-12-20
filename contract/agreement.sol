pragma solidity ^0.4.11;

contract Agreement {
    modifier onlyHost() {
        require(host == msg.sender);
        _;
    }

    modifier onlyRent() {
        require(rent == msg.sender);
        _;
    }

    modifier onlyCreater() {
        require(creator == msg.sender);
        _;
    }

    function Agreement(address _rent, address _host) public {
        initBlock = block.number;
        createTime = block.timestamp;
        rent = _rent;
        host = _host;
        creator = msg.sender;
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

    function endBlockInput(uint _inputEndBlock) public {
        endBlock = _inputEndBlock;
    }

    function ifEnd() public returns (bool) {
        return block.number > endBlock;
    }

    address public rent = 0x0;
    address public host = 0x0;
    address public creator = 0x0;

    uint public initBlock;
    uint public createTime;

    uint public endTime;
    uint public endBlock;

    function () payable {}
}