import React from 'react'

const Button = ({value}) => {
  return (
        <div className="w-full bg-black flex flex-row justify-center items-center text-white text-md font-semibold rounded-xl py-3 cursor-pointer">{value}</div>
  )
}

export default Button
