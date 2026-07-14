import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllShops = () => {
  const { allShops, getAllShops } = useContext(AdminContext)
  useEffect(() => {
    getAllShops()
  }, [allShops])
  return (
    <div className='flex flex-col w-full ml-[220px] mt-28 '>
      <p className='mb-4 text-2xl' >All Shops</p>
      {
        allShops.map((item, index) => (
          <div key={index} className='border border-gray-400 w-[90%] h-auto mb-3 grid grid-cols-[3fr_3fr_3fr_2fr] gap-2 p-4 text-sm items-center'>
            <img src={item.image} alt="" className='w-[90%] h-[90%]' />
            <div className='flex flex-col'>
              <p>Shop Name: {item.name}</p>
              <p>Owner: {item.owner}</p>
              <p>Mail: {item.email}</p>
              <p>Contact No: {item.contact}</p>
            </div>
            <div className='flex flex-col'>
              <p>Products: 60</p>
              <p>Orders: 30</p>
              <p>{item.address.one}</p>
              <p>{item.address.two}</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2' >

              <button className='border border-gray-500 w-[90%] h-6 text-blue-600'>View Products</button>
              <button className='border border-gray-500 w-[90%] h-6 text-green-600'>View Orders</button>

            </div>
          </div>
        ))
      }

    </div>
  )
}

export default AllShops
