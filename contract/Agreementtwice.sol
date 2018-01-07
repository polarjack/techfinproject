pragma solidity ^0.4.11;

contract Agreement {
  address owner;

  function Agreement() public {
    owner = msg.sender;
  }

  function sendMoney() public payable {
  }
  
  function getContractBalance() public returns (uint) {
    return this.balance;
  }
}
