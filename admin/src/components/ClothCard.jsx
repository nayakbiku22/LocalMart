import React from 'react'

const ClothCard = () => {
  return (
    <div className='h-[440px]   w-60 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer hover:border hover:border-blue-500 mx-2'>
      <img className='h-[65%] w-full rounded-md p-1' src="https://m.media-amazon.com/images/I/619ZtRS6SEL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
      <p className='m-1 font-medium text-black font'>Tshirt for Men | Men Polo t-Shirt Shirt | Solid Cotton Rich Polo T Shirt | Collar Tshirts | Half Sleeves | Plain-Regular Fit </p>
      <div className='flex flex-row justify-between mt-2'>
        <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;499</p>
        <button className='px-3 py-1 ml-3 mr-4 font-normal text-white bg-pink-500 border-none rounded-2xl hover:bg-pink-600'>edit</button>
      </div>
    </div>
  )
}

export default ClothCard
