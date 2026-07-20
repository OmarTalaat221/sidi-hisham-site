import React from 'react'

export default function NewsComponent() {
  return (
    <div className='flex md:flex-row flex-col py-4 md:w-[80%] md:mx-[10%] hover:scale-105 hover:shadow-xl duration-300 shadow-md rounded-xl bg-white'>
     
      <div className='md:flex-[25%] space-y-2 p-2 flex justify-center items-center flex-col'>
        <p className='text-sm text-gray-600 text-center'>date</p>
        {/* <Link href={`/news/newsDetails/${id}`}> */}
          <button className="bg-[#D40017] font-arabicMedium w-[80%] rounded-xl py-2  text-white">
            التفاصيل
          </button>
        {/* </Link> */}
      </div> 
       <div className='md:flex-[50%] flex-col bg-blue-500 p-2'>
        <p className='text-2xl font-arabicMedium text-end'>Title</p>
        <p className='text-sm font-arabicMedium text-end'>description</p>
      </div>
     <div className='md:flex-[25%] bg-yellow-200 p-2'>image</div>
    </div>
  )
}
