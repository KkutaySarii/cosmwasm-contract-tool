import React from 'react'
import { useState } from 'react'



function InputComponent() {
  const [step,setStep] = useState(1)
  if (step==1){
    return (
      <div className='container mx-auto'>
        <div className='grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins'>
          <div className='text-center mb-4 font-semibold tracking-wider text-lg'>Step - {step}</div>
          <div className=' space-y-[17px] mb-[30px]'>
              <p>Enter your first input</p>
              <textarea type="text" className=' w-full h-[100px] resize-none border border-white border-1 text-white bg-transparent p-2'/>
          </div>
          <div className=' flex items-center justify-center'>
              <button onClick={()=> setStep(step+1)} className='w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none'>Next</button>
          </div>
        </div>
      </div>
    )
  }
  else if (step==2){
    return(
      <div className='container mx-auto'>
        <div className='grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins'>
          <div className='text-center mb-4 font-semibold tracking-wider text-lg'>Step - {step}</div>
          <div className=' space-y-[17px] mb-[30px]'>
              <p>Enter your second input</p>
              <textarea type="text" className=' w-full h-[100px] resize-none border border-white border-1 text-white bg-transparent p-2'/>
          </div>
          <div className='flex justify-between'>
              <button onClick={()=> setStep(step+1)} className='w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none'>Retry</button>
              <button onClick={()=> setStep(step+1)} className='w-[550px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none'>Next</button>
          </div>
        </div>
      </div>
    )
  }
  else if (step==3){
    return(
      <div className='container mx-auto'>
        <div className='grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins'>
          <div className='text-center mb-4 font-semibold tracking-wider text-lg'>Step - {step}</div>
          <div className=' space-y-[17px] mb-[30px]'>
              <p>Enter your third input</p>
              <textarea type="text" className=' w-full h-[100px] resize-none border border-white border-1 text-white bg-transparent p-2'/>
          </div>
          <div className=' flex justify-between'>
              <button onClick={()=> setStep(step+1)} className='w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none'>Retry</button>
              <button onClick={()=> setStep(step+1)} className='w-[550px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none'>Summarize</button>
          </div>
        </div>
      </div>
    )
  }
  
}

export default InputComponent 