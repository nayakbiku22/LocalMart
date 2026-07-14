import React, { useContext, useState } from 'react'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const MyProfile = () => {
  const { userData, setUserData, uToken, backendURL, loadUserData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  if (!userData) {
    return <div>Loading...</div>
  }
   const updateUserData=async ()=>{
    try {
      const {data}=await axios.post(backendURL+`/api/user/update-profile`,{
        name:userData.name,
        contact:userData.contact,
        address:userData.address
      },{headers:{uToken}})
      if(data.success){
        toast.success(data.message)
       await loadUserData()
       setIsEdit(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <div className='scroll-smooth'>
      <div className='ml-[40%] justify-center mt-24'>
        <p className='mb-6 ml-[80px] text-2xl '>My Profile </p>
      <div className='flex flex-col max-w-md gap-2 text-sm'>
        <div className='flex flex-row'>
          <p className='mr-12 text-xl text-black'>Name : </p>
          {
            isEdit ?

              <input className='w-64 text-xl bg-gray-200 border' type="text" value={userData?.name || " "} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} /> :
              <p className='text-xl text-black '> {userData.name}</p>
          }
        </div>

        <div>
          <div className='grid grid-cols-[1fr_3fr] mt-3 gap-y-2 text-lg'>
            <p>Email :</p>
            <p className='text-blue-500'>{userData?.email || " "}</p>
            <p>Phone :</p>
            {
              isEdit ?
                <input className='w-64 bg-gray-200 border ' type="text" value={userData.contact} onChange={(e) => setUserData((prev) => ({ ...prev, contact: e.target.value }))} /> :
                <p className='text-blue-500'>{userData.contact}</p>
            }
            <p>Address:</p>
            {
              isEdit ?
                <p>
                  <input className='w-64 mb-1 bg-gray-200 border ' type="text" value={userData.address?.line1 || " "} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                  <br />
                  <input className='bg-gray-200 border  w-64 mt-[3px]' type="text" value={userData.address?.line2 || " "} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                </p> :
                <p>
                  {userData.address?.line1 || " "}
                  <br className='mb-1' />
                  {userData.address?.line2 || " "}
                </p>
            }
          </div>
        </div>


        <div className='mt-4 ml-2 '>
          {
            isEdit ?
              <button onClick={updateUserData} className='px-6 py-1 ml-[101px] font-semibold text-white bg-gray-600 border hover:bg-black' >Save Info</button> :
              <button className='px-6 py-1 ml-[102px] font-semibold text-white bg-gray-600 border hover:bg-black' onClick={() => setIsEdit(true)}>Edit</button>
          }
        </div>

      </div>
      
    </div>
    <Footer/>
    </div>
    

  )
}

export default MyProfile
