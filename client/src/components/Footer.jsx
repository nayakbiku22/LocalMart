import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
function Footer() {
    const navigate=useNavigate()
    return (
        <div className='mt-8 mb-10 text-gray-700'>
            <div className='grid grid-cols-2 gap-20'>
                {/* left */}
                <div className=''>
                    <img className='h-16 w-44' src={logo} alt="" />
                    <p>LocalMart is your trusted local shopping destination, offering quality products, affordable prices, and fast service. We connect communities with everyday essentials through a simple, reliable, and customer-friendly shopping experience.</p>
                </div>

                {/* centre */}
                <div className='grid grid-cols-2 gap-24 mt-6'>
                <div className=''>
                    <p className='mb-2 font-serif text-xl text-black'>COMPANY</p>
                    <ul className='hover:cursor-pointer'>
                        
                        <li className='hover:text-orange-700' onClick={()=>navigate('/home')}>Home</li>
                        <li className='hover:text-orange-700' onClick={()=>navigate('/about')} >About us</li>
                        <li className='hover:text-orange-700' onClick={()=>navigate('/contact')}>Contact us</li>
                        <li >Privacy policy</li>
                    </ul>
                </div>
                {/* right */}
                <div className=''>
                    <p className='mb-2 font-serif text-xl text-black'>GET IN TOUCH</p>
                    <p>+1-121-345-6547</p>
                    <p>localmart@gmail.com</p>
                </div>
                </div>
               
            </div>
        </div>


    )
}

export default Footer
