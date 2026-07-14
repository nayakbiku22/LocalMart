import React from 'react'
import Navbar from './components/Navbar.jsx'
import AllProducts from "./pages/AllProducts.jsx"
import {Routes,Route} from "react-router-dom"
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import MyProfile from './pages/MyProfile.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Login from './pages/Login.jsx'
import Orders from './pages/Orders.jsx'
import { ToastContainer } from "react-toastify";
import ProductDetails from './pages/ProductDetails.jsx'
import MyWishlist from './pages/MyWishlist.jsx'
import ShopDetails from './pages/ShopDetails.jsx'
const App = () => {
  return (
    <div className="mx-4">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/products' element={<AllProducts/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/my-wishlist' element={<MyWishlist/>} />
        <Route path='/products/:category/:id' element={<ProductDetails/>} />
        <Route path='/shops/:category/:id' element={<ShopDetails/>} />
        <Route path='/contact' element={<ContactUs/>} />
      </Routes>
    </div>
  )
}

export default App
