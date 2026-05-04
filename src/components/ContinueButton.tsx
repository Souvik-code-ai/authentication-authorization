import React from 'react'

const ContinueButton = ({src,value}) => {
  return (
    <div className='flex flex-row justify-center  items-center gap-3 rounded-xl border border-gray-300 p-3 cursor-pointer px-8 hover:bg-gray-200'>
            <img src={src}alt="" className='h-5 w-5' />
            <p className='text-black text-md font-semibold'>Continue with {value}</p>
        </div>
  )
}

export default ContinueButton
