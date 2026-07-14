import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from "react-toastify"
const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { aToken, setAToken, backendUrl } = useContext(AdminContext);
    const {sToken,setSToken,backendURL}=useContext(ShopContext)
    const navigate = useNavigate()
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                // console.log(data)
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                    navigate('/admin/dashboard')
                }else{
                    console.log(data)
                    toast.error(data.message)
                }

            } else {
               const {data}=await axios.post(backendURL+'/api/shop/login',{email,password})
                 if(data.success){
                    localStorage.setItem('sToken',data.token)
                    setSToken(data.token)
                     navigate('/shop/dashboard')
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }



    }
    return (
        <form onSubmit={onSubmitHandler} className='flex flex-row items-center min-h-[80vh] justify-center mt-8  ' action="">
            <div className='flex flex-col items-start gap-3 p-8 border shadow-2xl rounded-xl w-80'>
                <p className='text-2xl font-medium text-blue-600 '>{state === 'Admin' ? 'Admin Login' : 'Shop Login'}</p>


                <div className='w-full'>
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="text" />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="password" />
                </div>
                <button className='w-full py-2 mb-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700 hover:font-semibold'> Login</button>

                {
                    state === 'Admin' ?
                        <p>Shop Login? <span onClick={() => setState('Shop')} className='text-blue-700 underline cursor-pointer'> Click here</span></p>
                        : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-blue-700 underline cursor-pointer'>click here</span> </p>
                }
            </div>
        </form>

    )
}

export default Login
