const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { shopModel } = require("../models/shopModel")
const { bookModel } = require('../models/bookModel')
const { cloudinary } = require('../config/cloudinary');
const { clothModel } = require('../models/clothModel');
const { orderModel } = require('../models/orderModel');
const shopLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const shop = await shopModel.findOne({ email })
        if (!shop) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, shop.password)

        if (isMatch) {
            const token = jwt.sign({ id: shop._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
const getProfile = async (req, res) => {
    try {
        const { shopId } = req.user
        const profileData = await shopModel.findById(shopId)
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const addBook = async (req, res) => {
    try {
        const { shopId } = req.user
        const { name, price, category, title, stock } = req.body
        const imageFile = req.file
        if (!name || !price || !category || !title || !stock || !shopId) {
            return res.json({ success: false, message: "Details Missing" })
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url
        const shopData = await shopModel.findById(shopId)
        const bookData = {
            image: imageUrl,
            shopId,
            name,
            category,
            price,
            title,
            stock,
            shopData,
            date: Date.now(),
        }
        const newBook = new bookModel(bookData)
        await newBook.save()
        res.json({ success: true, message: "Book Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getBooks = async (req, res) => {
    try {
        const { shopId } = req.user
        const books = await bookModel.find({ shopId })
        res.json({ success: true, books })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getClothes = async (req, res) => {
    try {
        const { shopId } = req.user
        const clothes = await clothModel.find({ shopId })
        res.json({ success: true, clothes })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getOrders = async (req, res) => {
    try {
        const { shopId } = req.user
        const orders = await orderModel.find({ shopId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const addCloth = async (req, res) => {

    try {
        const { shopId } = req.user
        const { name, description, price, category, subCategory, sizes, stock } = req.body
        const imageA = req.files.imageA && req.files.imageA[0]
        const imageB = req.files.imageB && req.files.imageB[0]
        const imageC = req.files.imageC && req.files.imageC[0]
        const imageD = req.files.imageD && req.files.imageD[0]

        if (!name || !price || !category || !description || !stock || !subCategory || !sizes) {
            return res.json({ success: false, message: "Details Missing" })
        }
        const images = [imageA, imageB, imageC, imageD].filter((item) => item !== undefined)

        const imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )
        const shopData = await shopModel.findById(shopId)
        const clothData = {
            shopId,
            name,
            description,
            category,
            price,
            subCategory,
            stock,
            sizes: JSON.parse(sizes),
            image: imageUrl,
            shopData,
            date: Date.now()
        }
        //  console.log(clothData)
        const cloth = new clothModel(clothData)
        await cloth.save()
        res.json({ success: true, message: "Cloth Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getAllProducts = async (req, res) => {
    try {
        const { shopId } = req.user
        const books = await bookModel.find({ shopId })
        const clothes = await clothModel.find({ shopId })
        const allProducts = books.length + clothes.length
        res.json({ success: true, allProducts })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const { shopId } = req.user
        const orderData = await orderModel.findById(orderId)
        if (orderData.shopId !== shopId) {
            return res.json({ success: false, message: "Unauthorized Action" })
        }
        await orderModel.findByIdAndUpdate(orderId, { status: "Order Cancelled" })

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
const updateStatus = async (req, res) => {
    try {
        const { orderId, value } = req.body
        const { shopId } = req.user
        const orderData = await orderModel.findById(orderId)
        if (orderData.shopId !== shopId) {
            return res.json({ success: false, message: "Unauthorized Action" })
        }
        await orderModel.findByIdAndUpdate(orderId, { status: value })
        res.json({ success: true, message: value })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const updateProduct = async (req, res) => {
    try {
        const { productId, price, stock, shopCategory } = req.body
        // const { userId } = req.user

        if (!productId || !price || !stock || !shopCategory) {
            return res.json({ success: false, message: "Missing Details" })
        }
        if (shopCategory === 'clothes') {
            await clothModel.findByIdAndUpdate(productId, { price, stock })
        } else {
            await bookModel.findByIdAndUpdate(productId, { price, stock })
        }


        res.json({ success: true, message: "Details Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
module.exports = { shopLogin, getProfile, addBook, getBooks, addCloth, getClothes, getAllProducts, getOrders, cancelOrder, updateStatus, updateProduct }