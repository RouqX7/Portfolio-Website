import React from 'react'
import { FaReact } from 'react-icons/fa'
import { MdOutlineWeb } from "react-icons/md";

function Services() {
  return (
    <div className='min-h-screen flex flex-col p-8'> 
      {/* Title Section */}
      <h1 className='text-4xl font-bold text-gray-800  text-center'>Services</h1>
      <h2 className='text-md mt-2 text-gray-600 text-center'>What I offer</h2>

      {/* Container for Service Boxes */}
      <div className='flex-grow flex justify-center items-center'> 
        <div className='flex flex-row space-x-14'>
          <div className='bg-white h-64 w-48 rounded-md shadow-md'>
            <div className='flex flex-col p-4'>
              <MdOutlineWeb className='text-gray-500 text-3xl mt-24 ml-0' />
              <p className='mt-4 text-left text-gray-800'>Web Design</p>
            </div>
          </div>
          <div className='bg-white h-64 w-48 rounded-md shadow-md'>
            <div className='flex flex-col p-4'>
              <FaReact className='text-gray-500 text-3xl mt-24 ml-0' />
              <p className='mt-4 text-left text-gray-800'>React Development</p>
            </div>
          </div>
          <div className='bg-white h-64 w-48 rounded-md shadow-md'>
            <div className='flex flex-col p-4'>
              <FaReact className='text-gray-500 text-3xl mt-24 ml-0' />
              <p className='mt-4 text-left text-gray-800'>React Development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
