import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const ProductDetails = () => {
const [outOfStock,setOutOfStock]=useState(false)

  const navigate = useNavigate()
  const { category, id } = useParams()
  const { books, clothes, backendURL, uToken, userData,loadUserData } = useContext(AppContext)
  const [item, setItem] = useState(null)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')
  const [alreadyInList, setAlreadyInList] = useState(false)
  const fetchProductInfo = () => {
    if (category === 'clothes') {
      const clothInfo = clothes.find((cloth) => cloth._id === id)
      setItem(clothInfo)
      // console.log(item)
    } else if (category === 'books') {
      const bookInfo = books.find((book) => book._id === id)
      setItem(bookInfo)
      // console.log(item)
    }
  }
  const [avatar, setAvatar] = useState("")
  const handleImage = (img) => {
    setAvatar(img)
  }
  const handlePlus = () => {
    setQty((prev) => prev + 1)
  }
  const handleMinus = () => {
    if (qty == 1) {
      toast.error("Quantity should be at least 1")
    } else {
      setQty((prev) => prev - 1)
    }
  }
  const addToWishlist = async () => {
    if (uToken) {
      try {
        const { data } = await axios.post(backendURL + '/api/user/add-to-wishlist', { product:item,category }, { headers: { uToken } })
        if (data.success) {
          loadUserData()
          // fetchProductInfo()
          setAlreadyInList(true)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      navigate('/login')
    }

  }
  const removeFromWishlist = async () => {
    if (uToken) {
      try {
        const { data } = await axios.post(backendURL + '/api/user/remove-from-wishlist', { product: item }, { headers: { uToken } })
        if (data.success) {
          loadUserData()
          // fetchProductInfo()
          setAlreadyInList(false)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      navigate('/login')
    }

  }

  const handleOrder = async () => {
    if (uToken) {
      if (category === 'clothes') {
        if (size) {
          const price = qty * item.price
          try {
            const { data } = await axios.post(backendURL + '/api/user/place-order', {
              item, shopId: item.shopId, price, qty, user: userData, size, category
            }, { headers: { uToken } })
            if (data.success) {
              toast.success(data.message)
              navigate('/orders')
            } else {
              toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        } else {
          toast.error("Select Size")
        }
      } else if (category === 'books') {
        try {
          const price = qty * item.price
          const { data } = await axios.post(backendURL + '/api/user/place-order', {
            item, shopId: item.shopId, price, qty, user: userData, category
          }, { headers: { uToken } })
          if (data.success) {
            toast.success(data.message)
            navigate('/orders')
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    } else {
      navigate('/login')
    }
  }






  useEffect(() => {
    fetchProductInfo()
    loadUserData()
  }, [id, category, books, clothes])
  useEffect(() => {
    if (item && userData) {
      setAlreadyInList(userData.cartData.some(p => p.product._id === item._id))
    }
  }, [uToken, userData,item])
  useEffect(() => {
    if (item) {
      if (category == 'clothes') {
        setAvatar(item.image[0])
      }
      console.log(item.stock)
      if(item.stock<=0){
        setOutOfStock(true)
      }else{
        setOutOfStock(false)
      }
      
    }
  }, [item, category])
  if (!item) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full mt-24'>
      {
        category === 'clothes' ? <div className='flex flex-row w-full gap-6 mx-4 mt-6 '>
          <div className='flex flex-row w[50%] gap-4'>
            <div>
              {
                item.image.map((img, index) => (
                  <img onClick={() => handleImage(img)} src={img} key={index} className={`w-24 h-[100px] m-3 border cursor-pointer 
  ${avatar === img ? "border-blue-500 border-[1.5px]" : "border-gray-300"}`} />
                ))
              }
            </div>
            <img src={avatar} alt="" className='h-[433px] my-3 border border-gray-300' />
          </div>
          <div className='w-[45%] flex flex-col ml-3 mt-3 gap-3'>
            <p onClick={()=>navigate(`/shops/clothes/${item.shopData._id}`)} className='ml-1 font-serif text-lg text-blue-600 underline cursor-pointer'>{item.shopData.name}</p>
            <p className='text-xl'>{item.name}</p>
            <p className='text-xl font-medium'>Rs. {item.price}</p>
            <p className='text-gray-600'>{item.description}</p>
            <p className='font-medium'>Select Size</p>
            <div className='flex flex-row gap-2'>
              {
                item.sizes.map((s, index) => (
                  <p key={index} onClick={() => setSize(s)} className={`px-3 py-1 cursor-pointer bg-slate-300 ${size === s ? 'bg-slate-600 text-white' : ''}  `}>{s}</p>
                ))
              }

            </div>
            <div className='flex flex-row gap-2 mt-2 '>
              <p className='font-medium'>Qty : </p>
              <p onClick={handleMinus} className='border-[1.5px] px-[10px] border-gray-300  cursor-pointer'>-</p>
              <p className='border-[1.5px] px-3 border-gray-300  cursor-pointer'>{qty}</p>
              <p onClick={handlePlus} className='border-[1.5px] px-2 border-gray-300  cursor-pointer'>+</p>

            </div>
             {
              outOfStock && (<p className='font-semibold text-red-500 text-md'>Out of Stock</p>)
            }
            <div className='flex flex-row gap-4'>
              {
                alreadyInList ? <button onClick={removeFromWishlist} className='px-3 py-1 mt-5 text-white bg-orange-500 hover:bg-orange-600'>Remove From Wishlist</button> : <button onClick={addToWishlist} className='px-3 py-1 mt-5 text-white bg-pink-400 hover:bg-pink-500'>Add To Wishlist</button>
              }
              {
                !outOfStock && (<button onClick={handleOrder} className='px-3 py-1 mt-5 font-semibold text-gray-900 bg-yellow-300 hover:bg-yellow-400'>Order</button>)
              }
              
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-600 '>100% Original Product</p>
              <p className='text-sm text-gray-600 '>Cash on delivery is available on this product</p>
            </div>

          </div>
        </div> : category === 'books' ? <div className='flex flex-row w-full gap-6 ml-16 '>
          <div className='w-[40%]'>
            <img src={item.image} alt="" className='h-[433px] w-[83%] border border-gray-300 ' />
          </div>
          <div className='w-[45%] flex flex-col ml-3 mt-[36px] gap-3'>
            <p className='ml-1 font-serif text-lg text-blue-600 underline cursor-pointer'>{item.shopData.name}</p>
            <p className='text-xl'>{item.name}</p>
            <p className='text-xl font-medium'>Rs. {item.price}</p>
            <p className='text-gray-600'>{item.title}</p>

            <div className='flex flex-row gap-2 mt-2 '>
              <p className='font-medium'>Qty : </p>
              <p onClick={handleMinus} className='border-[1.5px] px-[10px] border-gray-300  cursor-pointer'>-</p>
              <p className='border-[1.5px] px-3 border-gray-300  cursor-pointer'>{qty}</p>
              <p onClick={handlePlus} className='border-[1.5px] px-2 border-gray-300  cursor-pointer'>+</p>
              
            </div>
            {
              outOfStock && (<p className='font-semibold text-red-500 text-md'>Out of Stock</p>)
            }
            <div className='flex flex-row gap-4'>
              {
                alreadyInList ? <button  onClick={removeFromWishlist} className='px-3 py-1 mt-5 text-white bg-orange-500 hover:bg-orange-600'>Remove From Wishlist</button> : <button onClick={addToWishlist} className='px-3 py-1 mt-5 text-white bg-pink-400 hover:bg-pink-500'>Add To Wishlist</button>
              }

              {
                !outOfStock &&(<button onClick={handleOrder} className='px-3 py-1 mt-5 font-semibold text-gray-900 bg-yellow-300 hover:bg-yellow-400'>Order</button>)
              }
                
            </div>
            <div className='mt-8'>
              <p className='text-sm text-gray-600 '>100% Original Product</p>
              <p className='text-sm text-gray-600 '>Cash on delivery is available on this product</p>
            </div>

          </div>
        </div> : " "
      }

      <Footer />
    </div>
  )
}

export default ProductDetails
