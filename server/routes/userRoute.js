const express=require("express")
const { getBooks, getClothes, loginUser, registerUser, getProfile, updateProfile, placeOrder, getOrders, cancelOrder, allShops, shopProducts, addToCart, removeFromCart } = require("../controllers/userController")
const {authUser}=require("../middleware/authUser.js")

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/books',getBooks)
userRouter.get("/shops",allShops)
userRouter.post("/shop-products",shopProducts)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/add-to-wishlist',authUser,addToCart)
userRouter.post('/remove-from-wishlist',authUser,removeFromCart)
userRouter.get('/get-orders',authUser,getOrders)
userRouter.post('/place-order',authUser,placeOrder)
userRouter.post('/cancel-order',authUser,cancelOrder)
userRouter.post('/update-profile',authUser,updateProfile)
userRouter.get('/clothes',getClothes)

module.exports={userRouter}