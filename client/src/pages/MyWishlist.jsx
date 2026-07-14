import React, { useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const MyWishlist = () => {
  const navigate=useNavigate()
  const {userData,loadUserData,uToken}=useContext(AppContext)
  useEffect(()=>{
    if(uToken){
      loadUserData()
    }
  },[uToken,userData])
  if(!userData?.cartData){
    return <div>No Items In The Wishlist</div>
  }
  return (
    <div className='flex flex-col mx-4 mt-20 '>
      {
        userData?.cartData?.length > 0 ? <div><p className='text-lg font-semibold ml-[45%]'>My Wishlist</p>
          <div className='grid grid-cols-4 gap-2 p-4 my-4 bg-violet-100'>
            {
              userData.cartData.map((it, index) => (
                <div onClick={() => navigate(`/products/${it.category}/${it.product._id}`)} key={index} className='h-[380px]   w-60 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer  mx-2 bg-white'>
                  {
                    it.category === 'books' ? <img className='h-[70%] w-full rounded-md p-1' src={it.product.image} alt="" /> : <img className='h-[70%] w-full rounded-md p-1' src={it.product.image[0]} alt="" />
                  }


                  <p className='mt-1 mb-1 ml-8 font-semibold text-black'>{it.product.name}</p>

                  <div className='flex flex-row justify-between mt-4'>
                    <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{it.product.price}</p>
                    <button className='px-3 py-1 ml-3 mr-4 font-normal text-black bg-pink-400 border-none rounded-2xl hover:bg-pink-500'>View</button>
                  </div>
                </div>
              ))
            }
          </div></div> : <div >No Items In The WishList</div>
      }
      <Footer />
    </div>
  )
}

export default MyWishlist
