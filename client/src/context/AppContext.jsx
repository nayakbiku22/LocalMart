import { createContext, useEffect, useState } from "react";

import axios from 'axios'
import { toast } from 'react-toastify'
export const AppContext = createContext();

const AppContextProvider = (props) => {

     const [uToken,setUToken]=useState(localStorage.getItem('uToken')?localStorage.getItem('uToken'):'')
      const [books,setBooks]=useState([])
      const [clothes,setClothes]=useState([])
      const [shops,setShops]=useState([])
    const [category, setCategory] = useState('clothes')
    const [userData, setUserData] = useState(null)
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const getBooks=async ()=>{
        try {
            const {data}=await axios.get(backendURL+'/api/user/books')
            if(data.success){
                setBooks(data.books)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getClothes=async ()=>{
        try {
            const {data}=await axios.get(backendURL+'/api/user/clothes')
            if(data.success){
                setClothes(data.clothes)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getShops=async ()=>{
        try {
            const {data}=await axios.get(backendURL+'/api/user/shops')
            if(data.success){
                setShops(data.shops)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

     const loadUserData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/user/get-profile', { headers: { uToken } })
            if (data.success) {
                setUserData(data.userData)
                // console.log(userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
 

    const value = {
        uToken,setUToken,getBooks,getClothes,books,clothes,backendURL,loadUserData,userData,setUserData,category,setCategory,shops,getShops
    }

    useEffect(()=>{
        getBooks()
        getClothes()
        getShops()
    },[])
    useEffect(() => {
        if(uToken){
            loadUserData()
        }else{
            setUserData(false)
        }
        
    }, [uToken])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider