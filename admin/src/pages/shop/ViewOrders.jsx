import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
function ViewOrders() {
  const { sToken, orders, getOrders ,backendURL} = useContext(ShopContext)
  const updateStatus=async (orderId,value)=>{
    try {
      const { data } = await axios.post(backendURL + '/api/shop/update-status', { orderId,value}, { headers: { sToken } })
      if (data.success) {
        toast.success(data.message)
        getOrders()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }
   const cancelOrder = async (orderId) => {
    //  console.log(orderId)
    try {
      const { data } = await axios.post(backendURL + '/api/shop/cancel-order', { orderId}, { headers: { sToken } })
      if (data.success) {
        toast.success(data.message)
        getOrders()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (sToken) {
      getOrders()
    }
  }, [sToken,orders])
  return (
    <div className='flex flex-col w-full ml-[220px] mt-28'>
      <p className='mb-4 text-2xl' >Order Page</p>
      {
        orders.map((order, index) => (
          <div key={index} className='border border-gray-400 w-[90%] h-auto mb-3 grid grid-cols-[2fr_4fr_4fr_2fr_3fr] gap-2 p-4 text-sm items-center'>
            <img src={order.category === 'clothes' ? order.item.image[0] : order.item.image} className='w-24 h-24 my-2 mr-4' alt="" />
            <div className='flex flex-col '>
              <p className='font-semibold'>{order.item.name}</p>
              <div className='flex flex-row gap-3'>
                <p>Qty:<span className='ml-1 font-semibold '>{order.quantity} </span> </p>
                {
                  order.category === 'clothes' ? <p>Size:<span className='ml-1 font-semibold '>{order.size} </span> </p> : ""
                }

              </div>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Date: <span className='font-semibold'>{formatDate(order.date)}</span> </p>
            </div>
            <div className='flex flex-col'>
              <p className='font-semibold'>{order.user.name}</p>
              <p className='font-semibold'>{order.user.address.line1}</p>
              <p className='font-semibold'>{order.user.address.line2}</p>
              <p>{order.user.contact}</p>
            </div>
            <div className='ml-6 font-semibold'>Rs. {order.price}</div>
            <div className='flex flex-col gap-3' >
              {
                order.status==='Order Cancelled'?<button className='border border-gray-500 w-[90%] h-6 text-red-600'  >
                  Order Cancelled
                </button> : <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className='border border-gray-500 w-[90%] h-6 text-green-600 cursor-pointer'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Order Dispatched">Order Dispatched</option>
                <option value="Order Delivered">Order Delivered</option>
              </select>
              }
             
              {
                order.status !== 'Order Cancelled'&& order.status !== 'Order Delivered' ? <button className='border border-gray-500 w-[90%] h-6 text-red-600' onClick={() => cancelOrder(order._id)} >
                  Cancel  Order
                </button> : ""
              }

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ViewOrders
