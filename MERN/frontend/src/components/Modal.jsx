import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Product Modal</h2>
        {/* Your form goes here */}
        <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        <button onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default Modal;