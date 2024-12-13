# Simple Invoice DApp

## Project Overview

The Simple Invoice DApp is a decentralized application built on the Ethereum blockchain. It allows sellers to create invoices, buyers to pay invoices, and sellers to withdraw funds. This DApp leverages smart contracts to ensure secure and transparent transactions.

## Features

- **Create Invoice**: Sellers can create invoices by specifying the buyer's address, the amount, and the due date.
- **Pay Invoice**: Buyers can pay the invoice by providing the invoice ID and the amount in Wei (Ethereum's smallest unit).
- **Withdraw Funds**: Sellers can withdraw the funds from the paid invoices.

## Smart Contract

The core of this DApp is the `SimpleInvoice` smart contract written in Solidity. The contract manages the creation, payment, and withdrawal of invoices. It includes the following main functions:

- `addInvoice(buyer, amount, dueDate)`: Creates a new invoice.
- `payInvoice(invoiceId)`: Allows the buyer to pay the invoice.
- `withdraw()`: Allows the seller to withdraw the funds.

## Deployment

The smart contract is deployed on a local Ethereum blockchain using Ganache CLI and Truffle framework.

### Steps to Deploy

1. **Compile the Contract**:
   ```
   truffle compile

2. **Deploy the Contract**:
   ```
   truffle migrate --network development
3. **Start Ganache CLI:**
   ```
   ganache-cli

## Front-End

The front-end of the DApp is built using React and Tailwind CSS for styling. It provides a user-friendly interface for interacting with the smart contract.

### Key Components
**InvoiceForm**: A form for creating new invoices.

**PayInvoiceForm**: A form for paying invoices.

**WithdrawFunds**: A button for withdrawing funds.

### Running the DApp
**1.Install Dependencies :**
```
  npm install
```
**2.Start the Development Server :**
```
npm run dev
```

**3.Open the DApp :**

* Open your browser and go to http://localhost:3000 to use the application.



