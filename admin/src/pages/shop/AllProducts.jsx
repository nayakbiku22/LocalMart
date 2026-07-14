import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from "react-router-dom";
function AllProducts() {
  const { sToken, books, getBooks, getClothes, clothes,shopCategory } = useContext(ShopContext)
  const navigate=useNavigate()
  useEffect(() => {
    if (sToken) {
      getBooks()
      getClothes()
    }
  }, [sToken])
  return (
    <div className='flex flex-col w-full mt-16 pt-4 ml-[195px] mr-3 bg-slate-100'>
      <p className='text-2xl font-semibold text-indigo-500 ml-[339px]'>All Products</p>
      
      {
        shopCategory == 'books' ? <div className='grid grid-cols-4 gap-2 m-4'>
          {
            books.map((item, index) => (
              <div onClick={()=>navigate(`/shop/all-products/${item._id}`)} key={index} className='h-[400px]   w-[212px] rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer hover:border hover:border-blue-500 bg-white'>
                <img className='h-[65%] w-full rounded-md p-1' src={item.image} alt="" />
                <p className='mx-2 my-1 text-black '><span className='font-semibold'>{item.name}  </span> | {item.title} </p>
                <div className='flex flex-row justify-between mt-4'>
                  <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{item.price}</p>
                   <button className='px-3 py-1 ml-3 mr-4 font-semibold text-black border border-black rounded-2xl'>Stock: {item.stock}</button>
                </div>
              </div>
            ))
          }


        </div> : <div className='grid grid-cols-3 gap-2 m-4'>
          {
            clothes.map((cloth, index) => (
              <div onClick={()=>navigate(`/shop/all-products/${cloth._id}`)} key={index} className='h-[410px]   w-64 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer hover:border hover:border-blue-500 mx-2 bg-white'>
                <img className='h-[65%] w-full rounded-md p-1' src={cloth.image[0]} alt="" />
                <p className='m-1 font-semibold text-black '>{cloth.name}<span className='font-normal'>| {cloth.description}</span> </p>
                <div className='flex flex-row justify-between mt-4'>
                  <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{cloth.price}</p>
                  <button className='px-3 py-1 ml-3 mr-4 font-semibold text-black border border-black rounded-2xl'>Stock: {cloth.stock}</button>
                </div>
              </div>
            ))
          }
        </div>
      }

    </div>
  )
}

export default AllProducts
