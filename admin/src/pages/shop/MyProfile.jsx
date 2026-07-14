import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useEffect } from 'react'

const MyProfile = () => {
    const {profileData,getProfileData,setProfileData,sToken}=useContext(ShopContext)
    useEffect(()=>{
        if(sToken){
            getProfileData()
        }
    },[sToken])
    return (
        <div className='w-full ml-[220px] mt-28'>
            <p  className='mb-4 text-2xl' >My Profile</p>
            <div className='flex flex-row gap-4'>
                 <img src={profileData.image} alt="" className='w-[30%] h-[30%] mb-2' />
            <div className='flex flex-col gap-1'>
                <p className='mx-2 text-md'> <span className='mr-1 font-medium'>Shop Name:</span>  {profileData.name}</p>
                <p className='mx-2 text-md'> <span className='mr-1 font-medium'>Owner:</span> {profileData.owner}</p>
                <p className='mx-2 text-md'><span className='mr-1 font-medium'>Mail: </span > <span className='text-blue-600'>{profileData.email}</span></p>
                <p className='mx-2 text-md'><span className='mr-1 font-medium'>Contact No:</span><span className='text-blue-600'>{profileData.contact}</span> </p>
                
                <p className='mx-2 text-md'><span className='mr-1 font-medium'>{profileData?.address?.one}</span></p> 
                 <p className='mx-2 text-md'><span className='mr-1 font-medium'>{profileData?.address?.two}</span></p>
                 <button  className='w-20 px-4 mt-1 ml-2 font-medium text-white bg-gray-500 h-7 hover:bg-black' >Edit</button>
            </div>
            </div>
           
        </div>
    )
}
export default MyProfile
