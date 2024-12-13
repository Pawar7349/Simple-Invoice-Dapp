import React, { useState } from 'react';
import useSimpleInvoice from '../hooks/useSimpleInvoices.js';

const PayInvoiceForm = () => {
  const { contract, account } = useSimpleInvoice();
  const [invoiceId, setInvoiceId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && account) {
      try {
        console.log("Paying invoice with:", {
          invoiceId,
          amount,
          from: account,
        });

        await contract.methods.payInvoice(invoiceId).send({ from: account, value: amount.toString(), gas: 300000 });
        alert('Invoice paid successfully!');
      } catch (error) {
        console.error('Error paying invoice:', error);
        alert('Error paying invoice');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Pay Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="invoiceId">Invoice ID</label>
          <input 
            type="number"
            id="invoiceId"
            className="w-full px-3 py-2 border rounded-lg"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            placeholder="Enter invoice ID"
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Pay Invoice</button>
      </form>
    </div>
  );
};

export default PayInvoiceForm;
