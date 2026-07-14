import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const ShopDetails = () => {
    const navigate = useNavigate()
    const { category, id } = useParams()
    // console.log(category)
    // console.log(id)

    const { shops, uToken, backendURL } = useContext(AppContext)
    // console.log(shops)
    const [item, setItem] = useState(null)
    const [products, setProducts] = useState([])
    const fetchShop = () => {
        if (category === 'clothes') {
            const clothInfo = shops.find((cloth) => cloth._id === id)
            setItem(clothInfo)
            // console.log(clothInfo)
        } else if (category === 'books') {
            const bookInfo = shops.find((book) => book._id === id)
            setItem(bookInfo)
            // console.log(bookInfo)
        }
    }
    const fetchProducts = async (id, category) => {
        try {
            const { data } = await axios.post(backendURL + '/api/user/shop-products', { id, category }, {})
            if (data.success) {
                console.log(data.products)
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
   useEffect(() => {
    if (shops.length > 0) {
        fetchShop();
    }
}, [shops, id, category]);

useEffect(() => {
    fetchProducts(id, category);
}, [id, category]);
    if (!item || !products ) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-col justify-center mx-4 mt-24 scroll-smooth '>
            <div className='w-[80%] flex flex-row gap-4 mb-6 ml-24'>
                <img className='w-[50%] rounded-md' src={item.image} alt="" />
                <div className='flex flex-col gap-3 mt-2'>
                    <div className='text-2xl font-semibold text-black'>{item.name}</div>
                    <div className='flex flex-col text-base text-gray-600'>
                        <p>{item.address.one}</p>
                        <p>{item.address.two}</p>
                    </div>
                    <div className='text-base font-semibold text-black'>Owner: <span className='text-base text-gray-700 '>{item.owner}</span></div>
                    <div className='text-base font-semibold'>Email: <span className='text-base text-blue-800'>{item.email}</span></div>
                    
                    <div className='text-base font-semibold text-blue-800'>+91-{item.contact}</div>
                    <div className='text-base font-semibold'> <span className='font-semibold'>Products : </span>{products.length}</div>
                </div>
            </div>
            {
                products.length>0?<div><p className='text-lg font-semibold ml-[45%]'>All Products</p>
            <div className='grid grid-cols-4 gap-2 p-4 my-4 bg-violet-100'>
                {
                    products.map((it, index) => (
                        <div onClick={() => navigate(`/products/${category}/${it._id}`)} key={index} className='h-[380px]   w-60 rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer  mx-2 bg-white'>
                            {
                                category === 'books' ? <img className='h-[70%] w-full rounded-md p-1' src={it.image} alt="" /> : <img className='h-[70%] w-full rounded-md p-1' src={it.image[0]} alt="" />
                            }


                            <p className='mt-1 mb-1 ml-8 font-semibold text-black'>{it.name}</p>

                            <div className='flex flex-row justify-between mt-4'>
                                <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{it.price}</p>
                                <button className='px-3 py-1 ml-3 mr-4 font-normal text-black bg-pink-400 border-none rounded-2xl hover:bg-pink-500'>View</button>
                            </div>
                        </div>
                    ))
                }
            </div></div>:" "
            }
            
            <Footer />
        </div>
    )
}

export default ShopDetails
