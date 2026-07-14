import { useState ,createContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
export const ShopContext=createContext()

const ShopContextProvider=(props)=>{
    const [sToken,setSToken]=useState(localStorage.getItem('sToken')?localStorage.getItem('sToken'):'')
    const backendURL=import.meta.env.VITE_BACKEND_URL
    const [profileData,setProfileData]=useState(false);
    const [books,setBooks]=useState([])
    const [clothes,setClothes]=useState([])
    const [orders,setOrders]=useState([])
    const [totalProducts,setTotalProducts]=useState(false)
    const [totalOrders,setTotalOrders]=useState(false)
    const [shopCategory,setShopCategory]=useState('')
    const getBooks=async (req,res)=>{
        try {
            const {data}=await axios.get(backendURL+'/api/shop/books',{headers:{sToken}})
            if(data.success){
                setBooks(data.books)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getClothes=async (req,res)=>{
        try {
            const {data}=await axios.get(backendURL+'/api/shop/clothes',{headers:{sToken}})
            if(data.success){
                setClothes(data.clothes)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getOrders=async (req,res)=>{
        try {
            const {data}=await axios.get(backendURL+'/api/shop/orders',{headers:{sToken}})
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

     const getProfileData=async ()=>{
      
        try {
              const {data}=await axios.get(backendURL+'/api/shop/my-profile',{headers:{sToken}})
              if(data.success){
                setProfileData(data.profileData)
                setShopCategory(data.profileData.category)
              }else{
                toast.error(data.message)
              }
        } catch (error) {
            toast.error(error.message)
        }
    }
     const getTotalProducts = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/shop/all-products', { headers: { sToken } })
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
    useEffect(()=>{
        if(sToken){
            getProfileData()
        }
    },[sToken])
    const value={
        sToken,setSToken,backendURL,profileData,setProfileData,getProfileData,getBooks,books,setBooks,clothes,setClothes,getClothes,totalProducts,getTotalProducts,orders,getOrders,totalOrders,shopCategory
    }

    return(
        <ShopContext.Provider  value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider