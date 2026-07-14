import React, { useState } from 'react'
import upload from "../../assets/upload.png"
import { toast } from "react-toastify"
import axios from "axios"
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
const AddShop = () => {
  const { backendUrl, aToken } = useContext(AdminContext)

  const [image, setImage] = useState(false)

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [one, setOne] = useState('')
  const [two, setTwo] = useState('')
  const [category,setCategory]=useState('clothes')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return toast.error("Image not selected")
      }
      const formData = new FormData()
      formData.append('image', image)
      formData.append('name', name)
      formData.append('owner', owner)
      formData.append('email', mail)
      formData.append('password', password)
      formData.append('contact', contact)
      formData.append('category', category)
      formData.append('address', JSON.stringify({ one: one, two: two }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-shop', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)

        setImage(false)
        setName('')
        setOwner('')
        setMail('')
        setPassword('')
        setContact('')
        setOne('')
        setTwo('')
        setCategory('clothes')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (

    <div className='mt-20 ml-[220px] w-full '>
      <p className='mb-8 text-2xl ml-[38%] mt-4' >Add Shop</p>
      <form onSubmit={handleSubmit} action="">
        <div className='flex flex-row w-full gap-2'>
          <div className='w-[36%]'>
            <label htmlFor="fileInput">
              <img className='m-2 cursor-pointer w-[90%] h-[90%]' src={image ? URL.createObjectURL(image) : upload} alt="" />
            </label>
            <input id='fileInput' className='' type="file" onChange={(e) => setImage(e.target.files[0])} hidden />


          </div>
          <div className='w-[64%] mt-6 ml-10 flex flex-col '>
            <div className="flex flex-row">
              <label className='font-medium' htmlFor="name">Shop Name :</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-[60%]' id='name' type="text" />
            </div>
            <div className='mt-2'>
              <label className='font-medium mr-9' htmlFor="price">Owner :</label>
              <input value={owner} onChange={(e) => setOwner(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-[60%]' id='price' type="text" />
            </div>
            <div className='mt-2'>
              <label className='font-medium mr-[53px]' htmlFor="price">Mail :</label>
              <input value={mail} onChange={(e) => setMail(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-[60%]' id='price' type="email" />
            </div>
            <div className='mt-2'>
              <label className='font-medium mr-[17px]' htmlFor="price">Password :</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-[60%]' id='price' type="password" />
            </div>
            <div className='mt-2'>
              <label className='mr-[3px] font-medium' htmlFor="price">Contact No :</label>
              <input value={contact} onChange={(e) => setContact(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-[60%]' id='price' type="text" />
            </div>
            <div className='mt-2'>
              <label className='font-medium mr-7' htmlFor="price">Address :</label>
              <input value={one} onChange={(e) => setOne(e.target.value)} className='h-[30px] ml-2 border border-gray-500 rounded-md w-[60%]' id='price' type="text" />
              <input value={two} onChange={(e) => setTwo(e.target.value)} className='h-[30px] ml-[102px] border border-gray-500 rounded-md w-[60%] mt-2' id='price' type="text" />
            </div>
            <div className='flex flex-row gap-2'>
              <p className='mt-2 mr-[20px] font-medium'>Category :</p>
               <select
                value={category}
                onChange={(e) =>setCategory(e.target.value)}
                className=' border h-[30px] border-gray-500 rounded-md mt-2 w-[30%] cursor-pointer'
              >
                 <option value="clothes">Clothes</option>
                <option value="books">Books</option>
               
                
              </select>
            </div>
            



            <button className='w-24 font-medium text-white bg-gray-500 mt-7 h-7 rounded-xl hover:bg-black ' >Add </button>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddShop
