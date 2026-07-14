import React, { useContext, useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import profile from '../assets/profile.webp'
import dropdown from '../assets/dropdown_icon.svg'
import logo from "../assets/logo.png"
function Navbar() {
    const { uToken,setUToken } = useContext(AppContext)
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(true);
    const logOut = () => {
        setUToken(false)
        localStorage.removeItem('uToken')
        navigate('/')
    }
    return (
        <div className='fixed z-50 flex items-center justify-between py-4 text-sm border-b-[1.5px] border-b-gray-600 h-16 mx-2 w-[96%] top-0 bg-white '  >
            <img className='cursor-pointer h-[60px] w-44' src={logo} alt='' />
            <ul className='items-start hidden gap-5 font-semibold md:flex'>
                <NavLink to={'/home'}
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-semibold"
                            : "hover:text-blue-500"
                    }>
                    <li >HOME</li>

                </NavLink>
                <NavLink to={'/products'} className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-500"
                }>
                    <li >PRODUCTS</li>

                </NavLink>
                <NavLink to={'/about'} className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-500"
                }>
                    <li >ABOUT</li>

                </NavLink>
                <NavLink to={'/contact'} className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-500"
                }>
                    <li >CONTACT</li>

                </NavLink>
            </ul>
            <div className='ml-4'>
                {
                    uToken ?
                        <div className='relative flex items-center gap-2 cursor-pointer group'>
                            <img className='w-8 rounded-full' src={profile} alt="" />
                            <img className='w-2.5 mr-4' src={dropdown} alt="" />
                            <div className='absolute top-0 right-0 z-20 hidden pt-16 text-base group-hover:block'>
                                <div className='flex flex-col gap-4 p-4 text-black min-w-44 bg-stone-200'>
                                    <p onClick={() => navigate('/my-Profile')} className='cursor-pointer hover:text-blue-700'>My profile</p>
                                    <p onClick={() => navigate('/my-wishlist')} className='cursor-pointer hover:text-blue-700'>My Wishlist</p>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-blue-700'>My Orders</p>
                                    <p onClick={logOut} className='cursor-pointer hover:text-blue-700'>Logout</p>
                                </div>
                            </div>
                        </div> :
                        <button onClick={() => navigate('/login')} className='hidden px-6 py-2 font-medium text-white bg-blue-600 rounded-3xl hover:font-semibold md:block'>Login</button>
                }

            </div>
        </div>
    )
}

export default Navbar
