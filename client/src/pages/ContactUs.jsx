import React from 'react'
import contact from '../assets/contact.jpg'
import Footer from '../components/Footer'
function ContactUs() {
  
  return (
    <div className='mt-24 scroll-smooth'>
      <div className='mt-8 font-sans text-2xl text-center '>
        <p className='text-gray-600'>CONTACT US</p>
      </div>
      <div className='flex flex-row justify-center gap-6 mt-12'>
       <img className='w-[30vw]' src={contact} alt="" />
       <div className='flex flex-col mt-8' >
          <p className='text-2xl text-gray-700'>Our OFFICE</p>
          <p className='mt-4 text-gray-600'>17/2 Garia Road <br /> PolicePara, Panchpota, WB</p>
          <p className='mt-4 text-gray-600'>Tel : (112) 55-5089 <br /> Email: localmart@gmail.com</p>
          <p className='mt-4 text-gray-600'>Learn more about our teams and jobs</p>
          <button className='mt-4 border-[1.5px] border-gray-700 h-10 w-28 p-2 text-center hover:bg-violet-600 hover:text-white'>Explore Jobs</button>
       </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ContactUs
