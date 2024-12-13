import React, { useState } from 'react';
import useSimpleInvoice from '../hooks/useSimpleInvoices.js';

const InvoiceForm = () => {
  const { contract, account } = useSimpleInvoice();
  const [buyer, setBuyer] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && account) {
      try {
        const result = await contract.methods.addInvoice(buyer, amount, dueDate).send({ from: account, gas: 300000 });
        alert('Invoice created successfully!');
        console.log("Invoice created successfully:", result);
      } catch (error) {
        console.error('Error creating invoice:', error);
        alert('Error creating invoice');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="buyer">Buyer Address</label>
          <input 
            type="text"
            id="buyer"
            className="w-full px-3 py-2 border rounded-lg"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            placeholder="Enter buyer address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">Amount (in Wei)</label>
          <input 
            type="number"
            id="amount"
            className="w-full px-3 py-2 border rounded-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in Wei"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">Due Date (Unix Timestamp)</label>
          <input 
            type="number"
            id="dueDate"
            className="w-full px-3 py-2 border rounded-lg"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Enter due date"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Create Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
