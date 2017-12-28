# Todo
```
1. complete items insert => binding with smart contract
2. combine users and items list
3. complete contract build
4. smart lock => next stage
```

# Steps Of Sending rawtx
```
1.  initalize contract code 
    sol => abi, bytecode
    combine with constructor (or not), generate contractData (not signed yet)
2.  Target your user, Prepare user_address & privateKey
    Both, you can get it from keystore file
3.  sign your transaction
4.  serialize
5.  sendRawTransaction => return txhash
6.  txhash => getTransactionReceipt => contract_address, gasUsed...
```

# Index
```
login
logout

intro
travel => browse all main page
host => redirect to hostmanage
```

# User & Host 欄位 (共用Table)
```
Name, email, password

users/list
users/insert
```

# Items 欄位
```
一個物件：
2017/12/20

current:
location: req.body.location,
item_name: req.body.itemName,
start_date: start_date,
end_date: end_date,
price_perday: req.body.pricePerDay
valid_start_date
valid_end_date

maybe:
people_available: req.body.peopleAvailable,
```

# Rent fill in info
```
start date, end date, whoami (session data)
```

# MyOrders
```
show my booked
```