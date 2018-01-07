pragma solidity ^0.4.11;

contract Agreement {
  address public admin;
  bool public life;

  address public host;
  uint public pricePerDay;
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

  function Lock(address _host, uint _price) public {
    admin = msg.sender;

    host = _host;
    pricePerDay = _price;

    life = true;
    ifbook = false;

    lockendblock = "null";
  }

  function book(address _user) public {
    user = _user;
    ifbook = true;
  }

  function cancel(address _user) public {
    require(user == _user);
    user = 0x0;
    ifbook = false;
  }

  function disableContract() public {
    life = false;
  }

  function setlock(string _blockNumber) public onlyadmin onlyhost {
    lockendblock = _blockNumber;
  }
}
