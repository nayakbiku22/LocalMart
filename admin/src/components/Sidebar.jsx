import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { BiSolidDashboard } from "react-icons/bi";
import { BiSolidCartAdd } from "react-icons/bi";
import { TfiViewListAlt } from "react-icons/tfi";
import { AiOutlineOrderedList } from "react-icons/ai";
import { ShopContext } from '../context/ShopContext';
import { AdminContext } from '../context/AdminContext';
import { TbManFilled } from "react-icons/tb";

const Sidebar = () => {
    const {sToken,}=useContext(ShopContext)
    const {aToken}=useContext(AdminContext)
    return (
        <div className='w-48 border-r-[1px] border-black h-[100vh] bg-white mt-[71px] left-0 fixed'>
            {
                sToken && <ul>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/shop/dashboard" >
                        <BiSolidDashboard className='mt-1' />
                        <p className='pl-2 '>Dashboard</p> <br />
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/shop/add-product" >
                        <BiSolidCartAdd className='mt-1' />
                        <p className='pl-2'>Add Product</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/shop/all-products" >
                        <TfiViewListAlt className='mt-1' />
                        <p className='pl-2'>All Products</p>
                    </NavLink>
                   
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/shop/view-orders" >
                        <AiOutlineOrderedList className='mt-1' />
                        <p className='pl-2'>View Orders</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/shop/my-profile" >
                        <TbManFilled className='mt-1' />
                        <p className='pl-2'>My Profile</p>
                    </NavLink>
                </ul>
            }
            {
                aToken && <ul>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/admin/dashboard" >
                        <BiSolidDashboard className='mt-1' />
                        <p className='pl-2 '>Dashboard</p> <br />
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/admin/add-shop" >
                        <BiSolidCartAdd className='mt-1' />
                        <p className='pl-2'>Add Shop</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/admin/all-products" >
                        <TfiViewListAlt className='mt-1' />
                        <p className='pl-2'>All Products</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/admin/all-shops" >
                        <TfiViewListAlt className='mt-1' />
                        <p className='pl-2'>All Shops</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'flex flex-row pt-2 pl-2 bg-sky-100 pb-2' : 'flex flex-row pt-2 pl-2 pb-2'} to="/admin/view-orders" >
                        <AiOutlineOrderedList className='mt-1' />
                        <p className='pl-2'>View Orders</p>
                    </NavLink>
                </ul>
            }


        </div>
    )
}

export default Sidebar
