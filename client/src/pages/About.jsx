import React from 'react'
import about from '../assets/about.jpg'
import Footer from '../components/Footer'
function About() {
  return (
    <div className='mx-6 mt-20 scroll-smooth'>
      <div className='mt-8 font-sans text-2xl text-center '>
        <p className='text-gray-600'>ABOUT US</p>
      </div>
      <div className='flex flex-row gap-4 mt-10 mx-14 '>
        <img className='w-[35vw] h-96 rounded-xl' src={about} alt="" />
        <div className='text-gray-800 '>
          <p className='p-2 text-lg'>Welcome to our Local Mart platform, designed to make daily shopping quick, easy, and convenient. We bring together trusted local stores so you can shop for books and clothes  from the comfort of your home.</p>
          <p className='p-2 text-lg'>Our platform offers smooth browsing, product categories, affordable pricing, secure payments, and quick delivery options to help you enjoy a hassle-free shopping experience while supporting local businesses.</p>
          <b className='pl-2'>Our Vision</b>
          <p className='p-2 text-lg'>
            Our vision is to empower local communities by connecting customers with trusted neighborhood stores, making shopping more accessible, reliable, and efficient for everyone.</p>
        </div>
      </div>
      <div className='text-xl my-9'>
        <p>WHY <span className='text-gray-700'>CHOOSE US</span></p>
      </div>
      <div className='grid w-full h-40 grid-cols-3 gap-1 text-lg'>
        <div className='flex flex-col justify-center p-3 hover:bg-violet-500 hover:text-white border-[1.5px] m-2 border-gray-400 '>
          <b>Efficiency:</b>
          <p className='mt-2'>Quick Product booking with minimal steps and delays.</p>
        </div>
        <div className='border-[1.5px] border-gray-400 flex flex-col justify-center p-3 m-2 hover:bg-violet-500 hover:text-white'>
          <b>Convenience:</b>
          <p>Access orders anytime, anywhere, from your device.
          </p>
        </div>
        <div className='border-[1.5px] border-gray-400 flex flex-col justify-center p-3 m-2 hover:bg-violet-500 hover:text-white'>
          <b>Personalization:</b>
          <p> Product recommendations matching your  needs.</p>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default About
