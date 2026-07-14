import React, { useContext } from 'react'
import Footer from '../components/Footer'
import hero from "../assets/hero.jpeg"
import book from "../assets/book.jpeg"
import cloth from "../assets/cloth.png"
import shop from "../assets/shop.png"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Home = () => {
  const navigate = useNavigate()
  const { setCategory, books, clothes } = useContext(AppContext)
  const home_cloth = clothes.slice(1, 3)
  const home_book = books.slice(0,2)
  return (
    <div className='w-[97%] mt-[65px] flex flex-col'>
      {/* header */}
      <div className='flex flex-row w-full my-2 ml-4 bg-gradient-to-r from-[#ECE1D9] to-[#F4EBDD] rounded-xl'>
        <div className='w-[50%] flex flex-col'>
          <div className="max-w-xl">
            <div className="inline-block px-5 py-2 mt-6 mb-4 ml-8 text-sm text-pink-700 bg-pink-200 rounded-full ">
              Local Choices, Trusted Quality
            </div>

            <h2 className="ml-8 text-5xl font-semibold leading-tight">
              Your Daily Needs,<br />
              <span className="text-[#b35c85]"> Delivered Locally</span>
            </h2>

            <p className="mt-6 text-lg text-black ml-9">
              Shop books and clothes from local stores .
            </p>


            <button onClick={() => navigate('/products')} className="bg-[#9c4f74] hover:bg-[#894567] text-white px-10 py-2  rounded-md font-semibold transition mt-6 ml-10">
              Shop Now
            </button>



          </div>
        </div>
        <img className='w-[50%] rounded-tr-xl rounded-br-xl' src={hero} alt="" />
      </div>
      <p className='ml-[45%] text-base font-semibold'>Shop by Category</p>
      <div className='flex flex-row w-full gap-3 mt-3 ml-5'>
        <div className='flex flex-col items-center justify-center rounded-md bg-purple-100 w-[340px] h-60'>
          <img className='h-40 mb-2 w-60 rounded-xl' src={book} alt="" />
          <p className='mb-1 text-base font-semibold'>Books</p>
          <p onClick={() => {
            setCategory('books')
            navigate("/products")
          }} className='mb-5 text-sm font-semibold text-pink-800 cursor-pointer'>Shop Now</p>
        </div>
        <div className='flex flex-col items-center justify-center rounded-md bg-pink-100 w-[340px] h-60 '>
          <img className='h-40 mb-2 w-60 rounded-xl' src={cloth} alt="" />
          <p className='mb-1 text-base font-semibold'>Clothes</p>
          <p onClick={() => {
            setCategory('clothes')
            navigate("/products")
          }} className='mb-5 text-sm font-semibold text-pink-800 cursor-pointer'>Shop Now</p>
        </div>
        <div className='flex flex-col items-center justify-center rounded-md bg-fuchsia-200 w-[340px] h-60'>
          <img className='h-40 mb-2 w-60 rounded-xl' src={shop} alt="" />
          <p className='mb-1 text-base font-semibold'>Shops</p>
          <p onClick={() => {
            setCategory('shops')
            navigate("/products")
          }} className='mb-5 text-sm font-semibold text-pink-800 cursor-pointer'>Visit Shops</p>
        </div>

      </div>
      <div className='flex flex-col mt-6 bg-purple-100 w-[99%] ml-4 rounded-md '>
        <div className='flex flex-row justify-between mt-4 mx-7'>
          <p className='text-base font-semibold'>Products</p>
          <p onClick={() => navigate("/products")} className='text-sm font-semibold text-pink-800 cursor-pointer'>View All Products</p>
        </div>
        <div className='grid grid-cols-4 gap-2 mx-5 my-4'>
          {
            home_cloth.map((cloth, index) => (
              <div onClick={() => navigate(`/products/clothes/${cloth._id}`)} key={index} className='h-[360px]   w-60 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer  mx-2 bg-white'>
                <img className='h-[75%] w-full rounded-md p-1' src={cloth.image[0]} alt="" />

                <p className='mt-1 mb-1 ml-8 font-semibold text-black'>{cloth.name}</p>

                <div className='flex flex-row justify-between mt-4'>
                  <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{cloth.price}</p>
                  <button className='px-3 py-1 ml-3 mr-4 font-normal text-black bg-pink-400 border-none rounded-2xl hover:bg-pink-500'>View</button>
                </div>
              </div>
            ))
          }
          {
            home_book.map((book, index) => (
              <div onClick={() => navigate(`/products/books/${book._id}`)} key={index} className='h-[360px]   w-60 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer  mx-2 bg-white'>
                <img className='h-[75%] w-full rounded-md p-1' src={book.image} alt="" />

                <p className='mt-1 mb-1 ml-8 font-semibold text-black'>{book.name}</p>

                <div className='flex flex-row justify-between mt-4'>
                  <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{book.price}</p>
                  <button className='px-3 py-1 ml-3 mr-4 font-normal text-black bg-pink-400 border-none rounded-2xl hover:bg-pink-500'>View</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
