import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const ProductDetails = () => {
    const { backendURL, sToken, shopCategory, clothes, books, getBooks, getClothes } = useContext(ShopContext)
    const [isEdit, setIsEdit] = useState(false)
    const { Id } = useParams()
    const cloth = clothes.find((item) => item._id === Id)
    const book = books.find((item) => item._id === Id)
    if (shopCategory === 'clothes') {
        if (!cloth) {
            return <p>Loading...</p>;
        }
    } else {
        if (!book) {
            return <p>Loading...</p>;
        }
    }

    const [clothPrice, setClothPrice] = useState("")
    const [clothStock, setClothStock] = useState("")

    const [bookPrice, setBookPrice] = useState("")
    const [bookStock, setBookStock] = useState("")

    const updateProductDetails = async () => {
        if (shopCategory === 'clothes') {
            try {
                const { data } = await axios.post(backendURL + '/api/shop/update-product', { productId: cloth._id, price: clothPrice, stock: clothStock, shopCategory }, { headers: { sToken } })
                if (data.success) {
                    toast.success(data.message)
                    await getClothes()
                    setIsEdit(false)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        } else {
            try {
                const { data } = await axios.post(backendURL + '/api/shop/update-product', { productId: book._id, price: bookPrice, stock: bookStock, shopCategory }, { headers: { sToken } })
                if (data.success) {
                    toast.success(data.message)
                    await getBooks()
                    setIsEdit(false)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        if (cloth) {
            setClothPrice(cloth.price);
            setClothStock(cloth.stock);
        }
    }, [cloth]);

    useEffect(() => {
        if (book) {
            setBookPrice(book.price);
            setBookStock(book.stock);
        }
    }, [book]);

    useEffect(() => {
        if (sToken) {
            getBooks()
            getClothes()
        }
    }, [sToken])
    return (
        <div className='flex flex-col w-full mt-20 mb-20 ml-[220px]'>
            <p className='text-2xl font-semibold text-gray-700 ml-[339px]'>Product Details</p>


            {
                shopCategory === 'clothes' ? <div className='flex flex-col mt-5 ml-4 '>
                    <p className='font-medium '>Images</p>

                    <div className='flex flex-row '>
                        <div className='my-2 mr-4'>

                            <img className='w-32 h-32 cursor-pointer' src={cloth.image[0]} alt="" />


                        </div>
                        <div className='my-2 mr-4'>

                            <img className='w-32 h-32 cursor-pointer' src={cloth.image[1]} alt="" />


                        </div>
                        <div className='my-2 mr-4'>

                            <img className='w-32 h-32 cursor-pointer' src={cloth.image[2]} alt="" />


                        </div>
                        <div className='my-2 mr-4'>

                            <img className='w-32 h-32 cursor-pointer' src={cloth.image[3]} alt="" />


                        </div>


                    </div>
                    <div className='flex flex-col mt-2'>
                        <label htmlFor="name" className='mb-3'>
                            Product Name :
                        </label>
                        <p className='border-gray-400 border-[2px] h-10 w-96' >{cloth.name}</p>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <label htmlFor="description" className='mb-3'>
                            Product description :
                        </label>
                        <p className='border-gray-400 border-[2px] h-20 w-96'>{cloth.description}</p>
                    </div>
                    <div className='flex flex-row mt-4 w-[400px] gap-1 justify-between'>
                        <div className=''>
                            <p>Product Catagory</p>
                            <p className='border-gray-400 border-[2px] mt-2 h-8 w-28 text-left' id="pc">
                                {cloth.category}
                            </p>
                        </div>
                        <div className=''>
                            <p>Sub Catagory</p>
                            <p className='border-gray-400 border-[2px] mt-2 h-8 w-28 text-left' id="pc">
                                {cloth.subCategory}
                            </p>
                        </div>
                        {
                            isEdit ? <div className=''>
                                <p>Product Price</p>
                                <input value={clothPrice} onChange={(e) => setClothPrice(e.target.value)} type='number' className='border-gray-400 border-[2px] mt-2 h-8 w-28 ' id="pc" />
                            </div> : <div className=''>
                                <p>Product Price</p>
                                <p className='border-gray-400 border-[2px] mt-2 h-8 w-28 '  >{cloth.price}</p>
                            </div>

                        }



                    </div>

                    <div className='flex flex-col mt-4'>
                        <p className='mb-2'>Product Sizes</p>
                        <div className='flex flex-row gap-2'>
                            {
                                cloth.sizes.map((item, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 cursor-pointer bg-slate-300"
                                    >
                                        {item}
                                    </div>
                                ))
                            }




                        </div>
                    </div>
                    {
                        isEdit ? <div className='flex flex-row mt-3 '>
                            <p className='mt-[10px] mr-2' >Stock : </p>
                            <input value={clothStock} onChange={(e) => setClothStock(e.target.value)} type='number' className='border-gray-400 border-[2px] mt-2 h-8 w-28 ' id="stock" />
                        </div> : <div className='flex flex-row mt-3 '>
                            <p className='mt-[10px] mr-2' >Stock : </p>
                            <p className='border-gray-400 border-[2px] mt-2 h-8 w-28 '  >{cloth.stock}</p>
                        </div>
                    }

                    {
                        isEdit ? <button onClick={updateProductDetails} className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 hover:bg-black ' >Save </button> : <button onClick={() => setIsEdit(true)} className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 hover:bg-black ' >Edit </button>
                    }



                </div> : <div >


                    <div className='flex flex-row'>
                        <div className='w[40%]'>

                            <img className='m-2 cursor-pointer w-60 h-80' src={book.image} alt="" />




                        </div>
                        <div className='w-[60%] mt-6 ml-10 flex flex-col '>
                            <div className='flex flex-row '>
                                <label className='mr-5 font-medium ' htmlFor="name">Name :</label>
                                <p className='h-[30px] ml-2 border border-gray-500 rounded-md w-80' >{book.name}</p>
                            </div>
                            {
                                isEdit ? <div className='mt-2 '>

                                    <label className='mr-8 font-medium' htmlFor="price">Price :</label>
                                    <input onChange={(e) => setBookPrice(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-30' id='price' type="number" value={bookPrice} />
                                </div> : <div className='flex flex-row mt-2 '>

                                    <label className='mr-[30px] font-medium ' htmlFor="price">Price :</label>
                                    <p className='h-[30px] ml-2 border border-gray-500 rounded-md w-40' >{book.price} </p>
                                </div>
                            }


                            <div className='flex flex-row my-2'>
                                <label className='font-medium' htmlFor="catagory">Catagory :</label>
                                <p className='h-[30px] ml-2 border border-gray-500 rounded-md w-[300px]' >{book.category}</p>
                            </div>
                            {
                                isEdit ? <div className='mt-2'>
                                    <label className='mr-[26px] font-medium' htmlFor="stock">Stock :</label>
                                    <input onChange={(e) => setBookStock(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-30' id='stock' type="number" value={bookStock} />
                                </div> : <div className='flex flex-row mt-2'>
                                    <label className='mr-[28px] font-medium' htmlFor="stock">Stock :</label>
                                    <p className='h-[30px] ml-2 border border-gray-500 rounded-md w-40' >{book.stock}</p>
                                </div>
                            }

                            <div className='flex flex-row mt-3 ml-3'>
                                <label className='mr-6 font-medium' htmlFor="title">Title :</label>
                                <p className='py-1 ml-2 border border-gray-500 rounded-md w-80'>{book.title}</p>
                            </div>
                            {
                                isEdit ? <button onClick={updateProductDetails} className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 hover:bg-black ' >Save </button> : <button onClick={() => setIsEdit(true)} className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 hover:bg-black ' >Edit </button>
                            }

                        </div>
                    </div>

                </div>
            }

        </div>
    )
}

export default ProductDetails
