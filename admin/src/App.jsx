import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import ShopDashboard from "./pages/shop/ShopDashboard"
import AddProduct from "./pages/shop/AddProduct"
import ViewOrders from "./pages/shop/ViewOrders"
import AllProducts from "./pages/shop/AllProducts"
import { useState, useContext } from "react"
import Login from "./pages/Login"
import { AdminContext } from "./context/AdminContext"
import { ShopContext } from "./context/ShopContext"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AddShop from "./pages/admin/AddShop"
import AdminViewOrders from "./pages/admin/AdminViewOrders"
import AdminAllProducts from "./pages/admin/AdminAllProducts"
import AllShops from "./pages/admin/AllShops"
import MyProfile from "./pages/shop/MyProfile"
import { ToastContainer } from "react-toastify";
import ProductDetails from "./pages/shop/ProductDetails"
function App() {
  const { aToken } = useContext(AdminContext)
  const { sToken } = useContext(ShopContext)
  return (
    <div>

      <ToastContainer />

      {
        aToken || sToken ? (
          <>
            <Navbar />

            <div className='flex items-start'>
              <Sidebar />

              <Routes>

                {/* SHOP ROUTES */}
                {
                  sToken && (
                    <>
                      <Route path="/shop/dashboard" element={<ShopDashboard />} />
                      <Route path="/shop/add-product" element={<AddProduct />} />
                      <Route path="/shop/all-products/:Id" element={<ProductDetails/>} />
                      <Route path="/shop/view-orders" element={<ViewOrders />} />
                      <Route path="/shop/all-products" element={<AllProducts />} />
                      <Route path="/shop/my-profile" element={<MyProfile />} />
                    </>
                  )
                }

                {/* ADMIN ROUTES */}
                {
                  aToken && (
                    <>
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/add-shop" element={<AddShop />} />
                      <Route path="/admin/view-orders" element={<AdminViewOrders />} />
                      <Route path="/admin/all-products" element={<AdminAllProducts />} />
                      <Route path="/admin/all-shops" element={<AllShops />} />
                    </>
                  )
                }

              </Routes>
            </div>
          </>
        ) : (
          <Login />
        )
      }

    </div>
  )
}

export default App
