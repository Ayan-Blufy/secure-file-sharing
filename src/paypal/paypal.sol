 //SPDX-License-Identifier: UNLICENSED
 pragma solidity >= 0.5.0 < 0.9.0;



 contract Paypal{
       

       event transactionsData(address indexed from ,address to,uint amount,string symbol);
        event recipients(address indexed recipientof,address recipient,string recipientname);

       function transactions(address payable to,string memory symbol) public payable {
            to.transfer(msg.value);
            emit transactionsData(msg.sender,to,msg.value,symbol);
       }

        function saveTransactions(address from,address to,uint amount,string memory symbol) public
        {
            emit transactionsData(from,to,amount,symbol);
        }

        function addRecipient(address recipient,string memory name) public {
            emit recipients(msg.sender,recipient,name);
        }



 }