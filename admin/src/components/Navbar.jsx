import React, { useContext, useState } from 'react'
import logo from "../assets/logo.png"
import { AdminContext } from '../context/AdminContext'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const {aToken, setAToken}=useContext(AdminContext)
  const {sToken,setSToken}=useContext(ShopContext)
  const navigate=useNavigate()
  const handleLogout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        sToken && setSToken('')
        sToken && localStorage.removeItem('sToken')
    }
  return (
    <div className='fixed top-0 left-0 z-50 w-full bg-white'>
      <div className='flex flex-row justify-between mr-8'>
        <div className='flex flex-row ml-2'>
          <img className='w-40 h-12 mt-2 ml-4 rounded-md ' src={logo} alt="" />
          <button className='w-auto h-8 px-2 mt-4 mb-3 ml-3 text-lg text-center text-blue-500 border border-blue-400 rounded-2xl'> {aToken?'Admin':'Shop'}</button>
        </div>
        <button onClick={handleLogout} className='pt-1 pb-2 pl-5 pr-5 mt-4 mb-3 text-lg text-center text-white bg-blue-500 border rounded-2xl width-20 hover:bg-blue-600 hover:font-semibold'>logout</button>
      </div>
      <hr className='ml-6 mr-4 border-blue-300' />

    </div>
  )
}

export default Navbar
