import { useRouter } from 'next/router';
import React from 'react'

function summary() {
    const router = useRouter();
    const { query } = router.query;
  return (
    <div className='container mx-auto mt-20 w-2/3 min-h-screen'>
        <div className='text-white text-poppins m-4 space-y-11'>
            <h1 className='text-center text-3xl font-semibold tracking-wider mb-4'>Summary</h1>
            <ul className="max-h-48 w-56 overflow-y-auto">
  {query &&
    query.map((data, index) => (
      <li className='w-full' key={index} >
        <div className="whitespace-pre-line">
          {index + 1}. {data}
        </div>
        
      </li>
    ))}
</ul>
        </div>
        <div>
            <button></button>
            <button></button>
        </div>
    </div>
  )
}

export default summary