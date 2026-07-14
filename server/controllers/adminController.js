const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { shopModel } = require("../models/shopModel")
const { cloudinary } = require('../config/cloudinary');
const { bookModel } = require("../models/bookModel");
const { clothModel } = require("../models/clothModel");
const { orderModel } = require("../models/orderModel");

//Api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
//Api for adding shop
const addShop = async (req, res) => {
    try {
        const { name, owner, address, email, password, contact,category } = req.body
        const imageFile = req.file
        //console.log(req.body)
        //checking all data to add shop
        if (!name || !email || !password || !address || !contact || !owner || !category) {
            return res.json({ success: false, message: "Details Missing" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email" })
        }
        //validating strong password
        if (password.length < 4) {
            return res.json({ success: false, message: "Please Enter a password of length 4 atleast" })
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10)//between 5 and 15
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const shopData = {
            image: imageUrl,
            name,
            owner,
            address: JSON.parse(address),
            email,

            password: hashedPassword,
            contact,
            category,
            date: Date.now()
        }
        const newShop = new shopModel(shopData)
        await newShop.save();
        res.json({ success: true, message: "Shop added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//Api to fetch all-shops
const allShops=async (req,res)=>{
    try {
        const shops=await shopModel.find({}).select('-password')
        res.json({success:true,shops})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:message})
    }
}
const getBooks=async (req,res)=>{
    try {
        const books=await bookModel.find({})
        res.json({success:true,books})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getClothes=async (req,res)=>{
    try {
        const clothes=await clothModel.find({})
        res.json({success:true,clothes})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getAllProducts=async (req,res)=>{
    try {
        const books=await bookModel.find({})
        const clothes=await clothModel.find({})
        const allProducts=books.length+clothes.length
        res.json({success:true,allProducts})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const orderData = await orderModel.findById(orderId)
        
        await orderModel.findByIdAndUpdate(orderId, { status:"Order Cancelled"})
        let product;

        if (orderData.category === "clothes") {
            product = await clothModel.findById(orderData.item._id);
        } else {
            product = await bookModel.findById(orderData.item._id);
        }

        // Increase stock manually
        product.stock = product.stock + orderData.quantity;

        // or
        // product.stock += order.qty;

        await product.save();
        res.json({ success: true, message: "Order Cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

module.exports = { loginAdmin,addShop,allShops,getBooks ,getClothes,getAllProducts,getOrders,cancelOrder}