import React from 'react'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
const Orders = () => {
  const { uToken, backendURL } = useContext(AppContext)
  const [orderData, setOrderData] = useState([])
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }
  const getOrderData = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/get-orders', { headers: { uToken } })
      if (data.success) {
        setOrderData(data.orderData.reverse())
        // console.log(userData)
      } else {
        toast.error(data.message)
      }
      // console.log(orderData)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }
  const cancelOrder = async (orderId) => {
    //  console.log(orderId)
    try {
      const { data } = await axios.post(backendURL + '/api/user/cancel-order', { orderId}, { headers: { uToken } })
      if (data.success) {
        toast.success(data.message)
        getOrderData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (uToken) {
      getOrderData()
    }
  }, [uToken,orderData])
  if (!orderData) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className='flex flex-col mt-24 ml-20 scroll-smooth'>
       <div className='flex items-center justify-between mb-4'>
        <p className='text-2xl '>ORDERS</p>

        <button
          onClick={getOrderData}
          className='px-3 py-1 mr-[108px] text-white bg-gray-500 border rounded hover:bg-gray-700'
        >
          Refresh
        </button>
      </div>
        {
          orderData.map((order, index) => (
            <div key={index} className='border border-gray-400 w-[90%] h-auto mb-3 grid grid-cols-[2fr_5fr_3fr_2fr_3fr] gap-2 p-4 text-sm items-center'>
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
                <button className={`border border-gray-500 w-[80%] h-6  ${order.status==='Order Cancelled'?"text-red-600":"text-green-600"}`}>
                  {order.status}
                </button>
                {
                   order.status !== 'Order Cancelled'&& order.status !== 'Order Delivered' ? <button className='border border-gray-500 w-[80%] h-6 text-red-600' onClick={() => cancelOrder(order._id)} >
                    Cancel  Order
                  </button> : ""
                }

              </div>
            </div>
          ))
        }



      </div>
      <Footer />
    </div>

  )
}

export default Orders
