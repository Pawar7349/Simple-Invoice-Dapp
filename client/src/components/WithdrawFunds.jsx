import React from 'react';
import useSimpleInvoice from '../hooks/useSimpleInvoices';

const WithdrawFunds = () => {
  const { contract, account } = useSimpleInvoice();

  const handleWithdraw = async () => {
    if (contract && account) {
      try {
        await contract.methods.withdraw().send({ from: account, gas: 300000 });
        alert('Funds withdrawn successfully!');
      } catch (error) {
        console.error('Error withdrawing funds:', error);
        alert('Error withdrawing funds');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
      <button onClick={handleWithdraw} className="bg-green-500 text-white py-2 px-4 rounded-lg">Withdraw Funds</button>
    </div>
  );
};

export default WithdrawFunds;
