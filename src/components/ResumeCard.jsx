import React from 'react'

function ResumeCard({title,category}) {
  return (
    <div className='inline-flex items-center justify-center w-full bg-black text-white rounded-lg p-3 font-medium  shadow-sm mt-2+'>
      <h2>{title}</h2>

    </div>
  )
}

export default ResumeCard