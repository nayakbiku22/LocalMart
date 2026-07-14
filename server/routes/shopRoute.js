const express=require("express")
const {upload}=require("../middleware/multer.js")
const { shopLogin, getProfile, addBook, getBooks, addCloth, getClothes, getAllProducts, getOrders, cancelOrder, updateStatus, updateProduct } = require("../controllers/shopController")
const {authShop} = require("../middleware/authShop")
const shopRouter=express.Router()

shopRouter.post("/login",shopLogin)
shopRouter.get("/my-profile",authShop,getProfile)
shopRouter.get("/books",authShop,getBooks)
shopRouter.get("/all-products",authShop,getAllProducts)
shopRouter.get("/clothes",authShop,getClothes)
shopRouter.get("/orders",authShop,getOrders)
shopRouter.post('/cancel-order',authShop,cancelOrder)
shopRouter.post('/update-status',authShop,updateStatus)
shopRouter.post('/update-product',authShop,updateProduct)
shopRouter.post("/add-book",authShop,upload.single('image'),addBook)
shopRouter.post("/add-cloth",authShop,upload.fields([{name:"imageA",maxCount:1},{name:"imageB",maxCount:1},{name:"imageC",maxCount:1},{name:"imageD",maxCount:1}]),addCloth)

module.exports={shopRouter}