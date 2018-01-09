pragma solidity ^0.4.11;

contract LockPay {
  address public admin;
  bool public life;
  uint public promiseMoney;

  address public host;
  uint public pricePerDay;
  uint public userPay;
  bool public ifbook;

  address public user;
  
  string public lockendblock;

  modifier onlyadmin() {
    require(admin == msg.sender);
    _;
  }

  modifier onlyhost() {
    require(host == msg.sender);
    _;
  }

  modifier onlyuser() {
    require(user == msg.sender);
    _;
  }

  function lockPay (address _host, uint _price) public payable {
    admin = msg.sender;
    promiseMoney = msg.value;

    host = _host;
    pricePerDay = _price;

    life = true;
    ifbook = false;

    lockendblock = "null";
  }

  function book(address _user) public payable {
    userPay = msg.value;
    user = _user;
    ifbook = true;
  }

  function cancel() public {
    require(msg.sender == user);
    ifbook = false;

    user.transfer(userPay);
    user = 0x0;
  }

  function disableContract() public {
    require(msg.sender == host || msg.sender == admin);

    life = false;
    if (host != address(0)) {  
      host.transfer(promiseMoney);
    }
  }
  
  function setlock(string _blockNumber) public payable {
    require(ifbook == true);
    require(msg.sender == user);
    lockendblock = _blockNumber;
  }

  function () public payable { }
}
