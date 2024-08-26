import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

function ServicesModal({ title, summary, description, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='relative bg-white rounded-lg shadow-md px-20 py-10 flex flex-col gap-5 items-center w-96'>
        {/* Close button positioned above the white box */}
        <button 
          onClick={onClose} 
          className='absolute -top-10 right-0 text-black'
        >
          <IoCloseSharp size={30} />
        </button>
        <div className='mt-10 text-center font-bold'>{title}</div>
        <div className='text-gray-600'>{summary}</div>
        <div className='text-gray-400'>{description}</div>
      </div>
    </div>
  );
}

export default ServicesModal;
