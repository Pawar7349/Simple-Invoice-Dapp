import React from 'react';
import InvoiceForm from './components/InvoiceForm';
import PayInvoiceForm from './components/PayInvoiceForm';
import WithdrawFunds from './components/WithdrawFunds';
import 'tailwindcss/tailwind.css';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Simple Invoice DApp</h1>
      <div className="flex flex-col items-center">
        <InvoiceForm />
        <PayInvoiceForm />
        <WithdrawFunds />
      </div>
    </div>
  );
};

export default App;
