pragma solidity ^0.4.11;

contract Agreement {
  address public admin;
  bool life;

  address public host;
  uint public availableStartTime;
  uint public availableEndTime;
  uint public pricePerDay;
  bool public ifbook;

  address public user;
  uint public validStartTime;
  uint public validEndTime;

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

  modifier onlylife() {
    require(life == true);
    _;
  }

  function Agreement(address _host, uint _startTime, uint _endTime, uint _price) public {
    admin = msg.sender;

    host = _host;
    availableStartTime = _startTime;
    availableEndTime = _endTime;
    pricePerDay = _price;
    
    life = true;
    ifbook = false;
  }

  function book(address _user, uint _startTime, uint _endTime) public {
    require(ifbook == false);
    user = _user;
    validStartTime = _startTime;
    validEndTime = _endTime;
    ifbook = true;
  }

  function cancel(address _user) public {
    require(user == _user);
    user = 0x0;
    validStartTime = 0;
    validEndTime = 0;
    ifbook = false;
  }

  function disableContract() public onlyadmin{
    life = false;
  }

  function () public payable {}
}
