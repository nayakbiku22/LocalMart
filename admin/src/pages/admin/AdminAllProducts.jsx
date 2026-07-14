import React, { useContext, useEffect, useState } from 'react'

import ClothCard from '../../components/ClothCard';
import { AdminContext } from '../../context/AdminContext';
function AdminAllProducts() {
  const { aToken, getBooks, books, clothes, getClothes } = useContext(AdminContext)
  const [catagory, setCatagory] = useState('book');
  useEffect(() => {
    if (aToken) {
      getBooks()
      getClothes()
    }
  }, [aToken])
  return (
    <div className='flex flex-col w-full mt-20 ml-[210px]'>
      <p className='text-2xl font-semibold text-indigo-500 ml-[339px]'>All Products</p>
      <div className='flex flex-row mt-6 text-lg font-normal'>
        <p className='mr-4 text-violet-500'>Catagory ? </p>
        <input
          type="radio"
          id='book'
          name='catagory'
          value="book"
          checked={catagory === 'book'}
          onChange={(e) => setCatagory(e.target.value)}
        />
        <label htmlFor="book" className='ml-1 mr-5' >Books</label>
        <input
          type="radio"
          id='cloth'
          name='catagory'
          value="cloth"
          checked={catagory === 'cloth'}
          onChange={(e) => setCatagory(e.target.value)}
        />
        <label htmlFor="cloth" className='ml-1 mr-5' >Clothes</label>
      </div>
      <hr className='w-full mt-4 bg-violet-500 border-none h-[1px] ' />
      {
        catagory == 'book' ? <div className='grid grid-cols-4 gap-2 m-4'>
          {
            books.map((item, index) => (
              <div key={index} className='h-[390px]   w-52 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer hover:border hover:border-blue-500'>
                <img className='h-[65%] w-full rounded-md p-1' src={item.image} alt="" />
                <p className='mx-2 my-1 text-black '><span className='font-semibold'>{item.name}  </span>| {item.title} </p>
                <div className='flex flex-row justify-between mt-2'>
                  <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{item.price}</p>
                  <p className='mr-2 font-semibold '>Stock: {item.stock}</p>
                </div>
              </div>
            ))
          }


        </div> : <div className='grid grid-cols-3 gap-2 m-4'>
          {
            clothes.map((cloth, index) => (
              <div key={index} className='h-[440px]   w-60 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer hover:border hover:border-blue-500 mx-2'>
                <img className='h-[65%] w-full rounded-md p-1' src={cloth.image[0]} alt="" />
                <p className='m-1 font-semibold text-black '>{cloth.name}<span className='font-normal'>| {cloth.description}</span> </p>
                <div className='flex flex-row justify-between mt-4'>
                  <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{cloth.price}</p>
                  <p className='mr-4 font-semibold '>Stock: {cloth.stock}</p>
                </div>
              </div>
            ))
          }
        </div>
      }

    </div>
  )
}

export default AdminAllProducts
