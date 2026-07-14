const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { shopModel } = require("../models/shopModel")
const { bookModel } = require('../models/bookModel')
const { cloudinary } = require('../config/cloudinary');
const { clothModel } = require('../models/clothModel');
const { userModel } = require('../models/userModel');
const validator = require('validator');
const { orderModel } = require('../models/orderModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, address, contact } = req.body
        if (!name || !email || !password || !address || !contact) {
            return res.json({ success: false, message: "Missing Details" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }
        if (password.length < 4) {
            return res.json({ success: false, message: "Enter a password of minimum length of 4" })

        }
        console.log(req.body)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
            address,
            contact

        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find()
        res.json({ success: true, books })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getClothes = async (req, res) => {
    try {
        const clothes = await clothModel.find()
        res.json({ success: true, clothes })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getProfile = async (req, res) => {
    try {
        const { userId } = req.user
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getOrders = async (req, res) => {
    try {
        const { userId } = req.user
        const orderData = await orderModel.find({ userId })
        res.json({ success: true, orderData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const { userId } = req.user
        const orderData = await orderModel.findById(orderId)
        if (orderData.userId !== userId) {
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

const updateProfile = async (req, res) => {
    try {
        const { name, contact, address } = req.body
        const { userId } = req.user

        if (!name || !contact || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        await userModel.findByIdAndUpdate(userId, { name, contact, address })

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const placeOrder = async (req, res) => {
    try {
        const { userId } = req.user
        const { shopId, item, user, qty, price, size, category } = req.body

        let product;

        if (category === "clothes") {
            product = await clothModel.findById(item._id);
        } else {
            product = await bookModel.findById(item._id);
        }

        // Check stock
        if (product.stock < qty) {
            return res.json({
                success: false,
                message: `Only ${product.stock} items left. Reduce the quantity.`
            });
        }

        const orderData = {
            userId,
            shopId,
            user,
            item,
            quantity: qty,
            price,
            address: user.address,
            paymentMethod: "COD",
            category,
            size,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        // Reduce stock manually
        product.stock = product.stock - qty;

        // Save the updated product
        await product.save();

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const allShops = async (req, res) => {
    try {
        const shops = await shopModel.find({}).select('-password')
        res.json({ success: true, shops })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: message })
    }
}
const shopProducts = async (req, res) => {
    try {
        const { id, category } = req.body
        let products
        if (category === 'books') {
            products = await bookModel.find({ shopId: id })
        } else {
            products = await clothModel.find({ shopId: id })
        }

        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const addToCart = async (req, res) => {
    try {
        const { product, category } = req.body;
        const { userId } = req.user

        const user = await userModel.findById(userId);

        const itemExists = user.cartData.some(
            item => String(item.product._id) === String(product._id)
        );

        if (itemExists) {
            return res.json({
                success: false,
                message: "Item is already in the Wishlist"
            });
        }

        user.cartData.push({
            product,
            category
        });

        await user.save();

        res.json({
            success: true,
            message: "Item added to Wishlist",
            cartData: user.cartData
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};
const removeFromCart = async (req, res) => {
    try {
        const { product } = req.body;
        const { userId } = req.user

        const user = await userModel.findById(userId);

        user.cartData = user.cartData.filter(
            item => item.product._id.toString() !== product._id.toString()
        );



        await user.save();

        res.json({
            success: true,
            message: "Item removed from Wishlist",
            cartData: user.cartData
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};
module.exports = { getBooks, getClothes, loginUser, registerUser, getProfile, updateProfile, placeOrder, getOrders, cancelOrder, allShops, shopProducts, addToCart, removeFromCart }