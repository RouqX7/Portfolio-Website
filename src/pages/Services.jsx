import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { MdOutlineWeb } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import ServicesModal from '../components/ServicesModal';

function Services() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', summary: '', description: '' });

  const handleOpenModal = (title, summary, description) => {
    setModalData({ title, summary, description });
    setShowModal(true);
  };

  return (
    <div className='min-h-screen flex flex-col p-8'>
      {/* Title Section */}
      <h1 className='text-4xl font-bold text-gray-800 text-center'>Services</h1>
      <h2 className='text-md mt-2 text-gray-600 text-center'>What I offer</h2>

      {/* Container for Service Boxes */}
      <div className='flex-grow flex justify-center items-center'>
        <div className='flex flex-row space-x-14'>
          {/* First Service Box */}
          <div className='bg-white h-64 w-48 rounded-md shadow-md'>
            <div className='flex flex-col p-4'>
              <MdOutlineWeb className='text-gray-500 text-3xl mt-24 ml-0' />
              <p className='mt-4 text-left text-gray-800'>Full Stack Developer</p>
              <div className='flex flex-row mt-2 h-auto w-auto'>
                <button
                  onClick={() => handleOpenModal('Full Stack Developer', 'Build full stack web applications', 'I offer expertise in both frontend and backend development.')}
                  className='text-left text-gray-500'
                >
                  View more
                </button>
                <FaLongArrowAltRight className='mt-1 ml-1 text-gray-400 ' />
              </div>
            </div>
          </div>

          {/* Second Service Box */}
          <div className='bg-white h-64 w-48 rounded-md shadow-md'>
            <div className='flex flex-col p-4'>
              <MdOutlineWeb className='text-gray-500 text-3xl mt-24 ml-0' />
              <p className='mt-4 text-left text-gray-800'>Backend Developer</p>
              <div className='flex flex-row mt-2 h-auto w-auto'>
                <button
                  onClick={() => handleOpenModal('Backend Developer', 'Build scalable server-side applications', 'I specialize in creating robust backend solutions.')}
                  className='text-left text-gray-500'
                >
                  View more
                </button>
                <FaLongArrowAltRight className='mt-1 ml-1 text-gray-400 ' />
              </div>
            </div>
          </div>

          {/* Third Service Box */}
          <div className='bg-white h-64 w-48 rounded-md shadow-md'>
            <div className='flex flex-col p-4'>
              <MdOutlineWeb className='text-gray-500 text-3xl mt-24 ml-0' />
              <p className='mt-4 text-left text-gray-800'>Backend Developer</p>
              <div className='flex flex-row mt-2 h-auto w-auto'>
                <button
                  onClick={() => handleOpenModal('Backend Developer', 'Build scalable server-side applications', 'I specialize in creating robust backend solutions.')}
                  className='text-left text-gray-500'
                >
                  View more
                </button>
                <FaLongArrowAltRight className='mt-1 ml-1 text-gray-400 ' />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Modal */}
      {showModal && <ServicesModal onClose={() => setShowModal(false)} {...modalData} />}
    </div>
  );
}

export default Services;
