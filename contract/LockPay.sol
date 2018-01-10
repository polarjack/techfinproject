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

  function LockPay (address _host, uint _price) public payable {
    admin = msg.sender;
    promiseMoney = msg.value;

    host = _host;
    pricePerDay = _price;

    life = true;
    ifbook = false;

    lockendblock = "0";
  }

  function book(address _user) public payable {
    userPay = msg.value;
    user = _user;
    ifbook = true;
  }

  function cancelOrder() public {
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
