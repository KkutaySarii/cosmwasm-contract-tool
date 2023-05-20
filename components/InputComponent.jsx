import React from 'react'

function InputComponent() {
  return (
    <div className='container mx-auto'>
        <div className='grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins'>
        <div className=' space-y-[17px] mb-[30px]'>
            <p>Enter your input</p>
            <input type="text" className=' w-full h-[60px] border border-white border-1 text-white bg-transparent p-2'/>
        </div>
        <div className=' flex items-center justify-center'>
            <button className='w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10'>Submit</button>
        </div>
    </div>
    </div>
  )
}

export default InputComponent