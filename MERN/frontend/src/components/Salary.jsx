import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const Salary = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-teal-200 max-w-sm w-full text-center">
        <div className="flex justify-center items-center text-teal-600 text-5xl mb-4">
          <FaMoneyBillWave />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Salary</h2>
        <p className="text-3xl font-bold text-teal-700">$90,000</p>
        <span className="text-sm text-gray-500 mt-2 block">Monthly Income</span>
      </div>
    </div>
  );
};

export default Salary;
