import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()
    const { uToken, setUToken, backendURL } = useContext(AppContext)
    const [state, setState] = useState('Login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [line1, setLine1] = useState('')
    const [line2, setLine2] = useState('')


    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (state === 'Sign Up') {

             
                const { data } = await axios.post(backendURL + '/api/user/register', {
                    name,
                    email,
                    password,
                    contact,
                    address: {
                        line1,
                        line2
                    }
                }, {})
                if (data.success) {
                    localStorage.setItem('uToken', data.token)
                    setUToken(data.token)
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendURL + '/api/user/login', { email, password }, {})
                if (data.success) {
                    localStorage.setItem('uToken', data.token)
                    setUToken(data.token)
                    toast.success("Login Successful")
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className='flex flex-row items-center min-h-[80vh] justify-center mt-24 ' action="">
            <div className='flex flex-col items-start gap-3 p-8 border shadow-2xl rounded-xl'>
                <p className={`text-2xl font-medium text-blue-600 ${state === 'Sign Up' ? 'ml-[105px]' : 'ml-[85px]'}`}>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to order Product</p>
                {
                    state === 'Sign Up' ?
                        <div className='w-full'>
                            <p>Name : </p>
                            <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="text" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        : ''
                }
                <div className='w-full'>
                    <p>Email :</p>
                    <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className='w-full'>
                    <p>Password :</p>
                    <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                {
                    state === 'Sign Up' ? <div className='w-full'>
                        <div className='w-full'>
                            <p>Contact :</p>
                            <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="text" onChange={(e) => setContact(e.target.value)} value={contact} />
                        </div>
                        <div className='w-full mt-2'>
                            <p>Address :</p>
                            <input className='w-full p-1 mt-1 mb-2 border rounded-lg border-zinc-500' type="text" onChange={(e) => setLine1(e.target.value)} value={line1} />
                            <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="text" onChange={(e) => setLine2(e.target.value)} value={line2} />
                        </div>
                    </div> : ""
                }

                <button type='submit' className={`${state === 'Sign Up' ? 'w-60 ml-16 mt-2 ' : 'w-full'} py-2 mb-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700 hover:font-semibold`}> {state === 'Sign Up' ? 'Create Account' : 'Login'}</button>

                {
                    state === 'Sign Up' ?
                        <p>Already have an account? <span onClick={() => setState('Login')} className='text-blue-700 underline cursor-pointer'> Login here</span></p>
                        : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-blue-700 underline cursor-pointer'>click here</span> </p>
                }
            </div>
        </form>
    )
}

export default Login
