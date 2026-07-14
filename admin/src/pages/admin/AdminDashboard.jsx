import React, { useContext, useEffect } from 'react'
import { FiBox } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { AdminContext } from '../../context/AdminContext';

function AdminDashboard() {
  const {totalShops,totalProducts,getAllShops,getTotalProducts,aToken,getOrders,totalOrders,orders}=useContext(AdminContext)
  const recentOrders = orders.slice(0, 6)
    const formatDate = (timestamp) => {
    const date = new Date(timestamp)

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }
  useEffect(()=>{
    if(aToken){
      getAllShops()
      getTotalProducts()
      getOrders()
    }
  },[aToken])
  return (
    <div className='flex flex-col w-full mt-24 ml-[220px]'>
      <p className='text-xl font-medium'>Dashboard</p>
      <p className='text-sm'>Welcome back! Here's what's happening with your App.</p>
      <div className='flex flex-row w-full gap-4 mt-3'>
        <div className='h-32 border-none w-[27%] rounded-md bg-blue-50 shadow-md  cursor-pointer flex flex-row items-center justify-center font-semibold gap-3'>
          < BsHandbag className='w-10 h-10 p-1 bg-blue-200 rounded-md' />
          <div className='flex flex-col'>
            <p className='text-md'>Total Orders</p>
            <p className='text-xl'>{totalOrders}</p>
          </div>
        </div>
        <div className='h-32 border-none w-[27%] rounded-md bg-green-50 shadow-md border border-gray-400 opacity-[] cursor-pointer flex flex-row items-center justify-center font-semibold gap-3'>
          < FiBox className='w-10 h-10 p-1 bg-green-200 rounded-md' />
          <div className='flex flex-col'>
            <p className='text-md'>Total Products</p>
            <p className='text-xl'>{totalProducts}</p>
          </div>
        </div>
        <div className='h-32 border-none w-[27%] rounded-md bg-violet-50 shadow-md border border-gray-400 opacity-[] cursor-pointer flex flex-row items-center justify-center font-semibold gap-3'>
          < FaShoppingCart className='w-10 h-10 p-1 rounded-md bg-violet-200' />
          <div className='flex flex-col'>
            <p className='text-md'>Total Shops</p>
            <p className='text-xl'>{totalShops}</p>
          </div>
        </div>
      </div>

      <div className='w-[85%] h-auto border rounded-sm border-gray-400 mt-8 flex flex-col p-3'>
        <div className='flex flex-row justify-between'>
          <p className='font-semibold text-md'>Recent Orders</p>
          <Link to={"/admin/view-orders"} className='text-sm font-semibold text-blue-600'>View all Orders </Link>
        </div>

        <div className='grid grid-cols-[4fr_2fr_2fr_1fr_2fr] mt-4'>
          <p className='text-sm font-semibold text-blue-700'>Order ID</p>
          <p className='text-sm font-semibold text-blue-700'>Customer</p>
          <p className='text-sm font-semibold text-blue-700'>Date</p>
          <p className='text-sm font-semibold text-blue-700'>Amount</p>
          <p className='text-sm font-semibold text-blue-700'>Status</p>
        </div>
        {
          recentOrders.map((order, index) => (
            <div className='grid  grid-cols-[4fr_2fr_2fr_1fr_2fr] mt-1'>
              <p className='text-sm font-semibold '>{order._id}</p>
              <p className='text-sm font-semibold '>{order.user.name}</p>
              <p className='text-sm font-semibold '>{formatDate(order.date)}</p>
              <p className='text-sm font-semibold '>{order.price}</p>
              <p className={`text-sm font-semibold  ${order.status==='Order Cancelled'?"text-red-600":"text-green-600"} `}>{order.status}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminDashboard

