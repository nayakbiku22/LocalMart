// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
    },
    user:{
      type:Object,
      required:true,
    },
    item: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required:true,
      default: "Order Placed",
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: Boolean,
      required:true,
      default:false,
    },
    category:{
      type:String,
      required:true,
    },
    size:{
      type:String,
      default:''
    },
    date:{
      type:Number,
      required:true,
    }
  },
  { timestamps: true }
);
const orderModel= mongoose.model("Order", orderSchema);
module.exports ={orderModel}