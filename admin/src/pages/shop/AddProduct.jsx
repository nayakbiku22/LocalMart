import React, { useContext, useState } from 'react'
import upload from "../../assets/upload.png"
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'
import axios from "axios"

function AddProduct() {
  const { backendURL, sToken,shopCategory } = useContext(ShopContext)
  // cloth
  const [imageA, setImageA] = useState(false)
  const [imageB, setImageB] = useState(false)
  const [imageC, setImageC] = useState(false)
  const [imageD, setImageD] = useState(false)
  const [sizes, setSizes] = useState([]);
 
  const [clothName, setClothName] = useState('')
  const [clothDescription, setClothDescription] = useState('')
  const [clothPrice, setClothPrice] = useState('')
  const [clothCategory, setClothCategory] = useState('Men')
  const [clothSubCategory, setClothSubCategory] = useState('Topwear')

  const [clothStock,setClothStock]=useState("")


  
   const handleClothSubmit=async (e)=>{
    e.preventDefault()
    try {
      const formData=new FormData()
      
      formData.append('name',clothName)
      formData.append('description',clothDescription)
      formData.append('price',clothPrice)
      formData.append('category',clothCategory)
      formData.append('subCategory',clothSubCategory)
      formData.append('stock',clothStock)
      formData.append('sizes',JSON.stringify(sizes))
      imageA && formData.append('imageA',imageA)
      imageB && formData.append('imageB',imageB)
      imageC && formData.append('imageC',imageC)
      imageD && formData.append('imageD',imageD)
      
      const {data}=await axios.post(backendURL+'/api/shop/add-cloth',formData,{headers:{sToken}})
      if(data.success){
        toast.success(data.message)
        setClothName('')
        setClothPrice('')
        setClothDescription('')
        setClothCategory('Men')
        setClothSubCategory('Topwear')
        setClothStock('')
        setSizes([])
        setImageA(false)
        setImageB(false)
        setImageC(false)
        setImageD(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
   }


  //book
  const [image, setImage] = useState(false)
  const [bookName, setBookName] = useState('')
  const [bookCategory, setBookCategory] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookPrice, setBookPrice] = useState('')
  const [bookStock, setBookStock] = useState('')





  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return toast.error("Image not selected")
      }
      const formData = new FormData()
      formData.append('name', bookName)
      formData.append('image', image)
      formData.append('category', bookCategory)
      formData.append('price', bookPrice)
      formData.append('stock', bookStock)
      formData.append('title', bookTitle)

      const { data } = await axios.post(backendURL + '/api/shop/add-book', formData, { headers: { sToken } })
      if (data.success) {
        toast.success(data.message)

        setImage(false)
        setBookName('')
        setBookCategory('')
        setBookPrice('')
        setBookStock('')
        setBookTitle('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  return (
    <div className='flex flex-col w-full mt-20 mb-20 ml-[220px]'>
      <p className='text-2xl font-semibold text-gray-700 ml-[339px]'>Add Products</p>
      
    
      {
        shopCategory === 'books' ? <div >

          <form onSubmit={handleBookSubmit} action="">
            <div className='flex flex-row'>
              <div className='w[40%]'>
                <label htmlFor="fileInput">
                  <img className='m-2 cursor-pointer w-60 h-80' src={image ? URL.createObjectURL(image) : upload} alt="" />
                </label>
                <input id='fileInput' className='' type="file" onChange={(e) => setImage(e.target.files[0])} hidden />


              </div>
              <div className='w-[60%] mt-6 ml-10 flex flex-col '>
                <div>
                  <label className='mr-6 font-medium' htmlFor="name">Name :</label>
                  <input onChange={(e) => setBookName(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-80' id='name' type="text" value={bookName} />
                </div>
                <div className='mt-2'>
                  <label className='mr-8 font-medium' htmlFor="price">Price :</label>
                  <input onChange={(e) => setBookPrice(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-30' id='price' type="number" value={bookPrice} />
                </div>

                <div className='my-2'>
                  <label className='font-medium' htmlFor="catagory">Catagory :</label>
                  <input onChange={(e) => setBookCategory(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-80' id='catagory' type="text" value={bookCategory} />
                </div>
                <div className='mt-2'>
                  <label className='mr-[26px] font-medium' htmlFor="stock">Stock :</label>
                  <input onChange={(e) => setBookStock(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-30' id='stock' type="number" value={bookStock} />
                </div>
                <div className='mt-3 ml-3'>
                  <label className='mr-5 font-medium' htmlFor="title">Title :</label>
                  <textarea onChange={(e) => setBookTitle(e.target.value)} className='ml-2 border border-gray-500 rounded-md w-80' rows={4} col name="title" id="title" value={bookTitle} placeholder='Write about book...'></textarea>
                </div>
                <button className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 rounded-xl hover:bg-black ' >Add </button>

              </div>
            </div>
          </form>
        </div> : <div className='flex flex-col mt-5 ml-4 '>
          <p className='font-medium '>Upload Image</p>
          <form onSubmit={handleClothSubmit} action="">
            <div className='flex flex-row '>
              <div className='my-2 mr-4'>
                <label htmlFor="imageA">
                  <img className='w-32 h-32 cursor-pointer' src={imageA ? URL.createObjectURL(imageA) : upload} alt="" />
                </label>
                <input onChange={(e) => setImageA(e.target.files[0])} id='imageA' type="file" hidden />
              </div>
              <div className='my-2 mr-4'>
                <label htmlFor="imageB">
                  <img className='w-32 h-32 cursor-pointer' src={imageB ? URL.createObjectURL(imageB) : upload} alt="" />
                </label>
                <input onChange={(e) => setImageB(e.target.files[0])} id='imageB' type="file" hidden />
              </div>
              <div className='my-2 mr-4 cursor-pointer'>
                <label htmlFor="imageC">
                  <img className='w-32 h-32 cursor-pointer' src={imageC ? URL.createObjectURL(imageC) : upload} alt="" />
                </label>
                <input onChange={(e) => setImageC(e.target.files[0])} id='imageC' type="file" hidden />
              </div>
              <div className='my-2 mr-4'>
                <label htmlFor="imageD">
                  <img className='w-32 h-32 cursor-pointer' src={imageD ? URL.createObjectURL(imageD) : upload} alt="" />
                </label>
                <input onChange={(e) => setImageD(e.target.files[0])} id='imageD' type="file" hidden />
              </div>

            </div>
            <div className='flex flex-col mt-2'>
              <label htmlFor="name" className='mb-3'>
                Product Name :
              </label>
              <input value={clothName} onChange={(e) => setClothName(e.target.value)} id='name' type="text" className='border-gray-400 border-[2px] h-10 w-96' />
            </div>
            <div className='flex flex-col mt-2'>
              <label htmlFor="description" className='mb-3'>
                Product description :
              </label>
              <textarea value={clothDescription} onChange={(e) => setClothDescription(e.target.value)} name="description" id="" className='border-gray-400 border-[2px] h-20 w-96'></textarea>
            </div>
            <div className='flex flex-row mt-4 w-[400px] gap-1 justify-between'>
              <div className=''>
                <p>Product Catagory</p>
                <select onChange={(e) => setClothCategory(e.target.value)} className='border-gray-400 border-[2px] mt-2 h-8 w-28 text-left' id="pc">
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className=''>
                <p>Sub Catagory</p>
                <select onChange={(e) => setClothSubCategory(e.target.value)} className='border-gray-400 border-[2px] mt-2 h-8 w-28 text-left' id="pc">
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Innerwear">Innerwear</option>
                </select>
              </div>
              <div className=''>
                <p>Product Price</p>
                <input value={clothPrice} onChange={(e) => setClothPrice(e.target.value)} type='number' className='border-gray-400 border-[2px] mt-2 h-8 w-28 ' id="pc" />
              </div>


            </div>

            <div className='flex flex-col mt-4'>
              <p className='mb-2'>Product Sizes</p>
              <div  className='flex flex-row gap-2'>
                <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item => item!=="S"):[...prev,"S"])}>
                  <p className={`px-3 py-1 cursor-pointer ${sizes.includes("S")?"bg-slate-500 text-white":"bg-slate-300"}`}>S</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item => item!=="M"):[...prev,"M"])}>
                  <p className={`px-3 py-1 cursor-pointer ${sizes.includes("M")?"bg-slate-500 text-white":"bg-slate-300"}`}>M</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item => item!=="L"):[...prev,"L"])}>
                  <p  className={`px-3 py-1 cursor-pointer ${sizes.includes("L")?"bg-slate-500 text-white":"bg-slate-300"}`}>L</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item => item!=="XL"):[...prev,"XL"])}>
                  <p  className={`px-3 py-1 cursor-pointer ${sizes.includes("XL")?"bg-slate-500 text-white":"bg-slate-300"}`}>XL</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item => item!=="XXL"):[...prev,"XXL"])}>
                  <p  className={`px-3 py-1 cursor-pointer ${sizes.includes("XXL")?"bg-slate-500 text-white":"bg-slate-300"}`}>XXL</p>
                </div>
              
              </div>
            </div>
             <div className='flex flex-row mt-3 '>
                <p className='mt-[10px] mr-2' >Stock : </p>
                <input value={clothStock} onChange={(e) => setClothStock(e.target.value)} type='number' className='border-gray-400 border-[2px] mt-2 h-8 w-28 ' id="stock" />
              </div>
            <button className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 hover:bg-black ' >Add </button>
          </form>

        </div>
      }

    </div>
  )
}

export default AddProduct
