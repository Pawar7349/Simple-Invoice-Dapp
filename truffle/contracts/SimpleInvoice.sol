// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleInvoice {
    enum Status { Pending, Complete }

    struct Invoice {
        address seller;
        address buyer;
        uint amount;
        Status status;
        uint dueDate;
    }

    Invoice[] public invoices;
    mapping(address => uint) public balances;

    event InvoiceCreated(uint id, address seller, address buyer, uint amount, uint dueDate);
    event InvoicePaid(uint id);
    event Withdraw(address indexed seller, uint amount);

    // Create a new invoice
    function addInvoice(address buyer, uint amount, uint dueDate) public {
        require(dueDate > block.timestamp, "Due date must be in the future");

        invoices.push(Invoice({
            seller: msg.sender,
            buyer: buyer,
            amount: amount,
            status: Status.Pending,
            dueDate: dueDate
        }));

        emit InvoiceCreated(invoices.length - 1, msg.sender, buyer, amount, dueDate);
    }

    // Pay an invoice
    function payInvoice(uint invoiceId) public payable {
        Invoice storage invoice = invoices[invoiceId];
        require(invoice.status == Status.Pending, "Invoice already paid");
        require(invoice.buyer == msg.sender, "Only the buyer can pay this invoice");
        require(msg.value == invoice.amount, "Incorrect payment amount");

        invoice.status = Status.Complete;
        balances[invoice.seller] += msg.value;

        emit InvoicePaid(invoiceId);
    }

    // Withdraw funds
    function withdraw() public {
        uint amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Withdraw(msg.sender, amount);
    }

    // Get details of an invoice
    function getInvoice(uint invoiceId) public view returns (address, address, uint, Status, uint) {
        Invoice memory invoice = invoices[invoiceId];
        return (invoice.seller, invoice.buyer, invoice.amount, invoice.status, invoice.dueDate);
    }
}
