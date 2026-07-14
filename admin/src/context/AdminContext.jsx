import { useState, createContext, useEffect } from "react";
import axios from "axios"
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [allShops, setAllShops] = useState([])
    const [books, setBooks] = useState([])
    const [clothes, setClothes] = useState([])
    const [orders,setOrders]=useState([])
    const [totalShops, setTotalShops] = useState(false)
    const [totalOrders,setTotalOrders]=useState(false)
    const [totalProducts, setTotalProducts] = useState(false)
    const getBooks = async (req, res) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/books', { headers: { aToken } })
            if (data.success) {
                setBooks(data.books)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getClothes = async (req, res) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/clothes', { headers: { aToken } })
            if (data.success) {
                setClothes(data.clothes)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getOrders=async (req,res)=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/orders',{headers:{aToken}})
            if(data.success){
                const reversedOrders = data.orders.reverse()
                setOrders(reversedOrders)
                setTotalOrders(reversedOrders.length)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getAllShops = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-shops', { headers: { aToken } })
            // console.log(data)
            if (data.success) {
                setAllShops(data.shops)
                setTotalShops(data.shops.length)
                // console.log(data.shops)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getTotalProducts = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-products', { headers: { aToken } })
            if (data.success) {
                setTotalProducts(data.allProducts)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken, backendUrl, allShops, setAllShops, getAllShops, books, setBooks, getBooks, totalShops, clothes, setClothes, getClothes, getTotalProducts, totalProducts, setTotalProducts,getOrders,totalOrders,orders
    }

    useEffect(() => {
        if (aToken) {
            getAllShops()
            getBooks()
            getClothes()

        }

    }, [aToken])
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider