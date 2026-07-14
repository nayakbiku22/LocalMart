// models/Shop.js
const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    // Reference to User (Seller)
    image:{
      type:String,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },

    // Login Credentials 
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    // If require , otherwise delete
    isActive: {
      type: Boolean,
      default: true,
    },
    category:{
      type:String,
      required:true,
    },
    date:{
      type:Number,
      required:true
    },
  },
  { timestamps: true }
);

const shopModel=mongoose.model("shop", shopSchema);
module.exports = {shopModel}