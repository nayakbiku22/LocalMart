// models/Clothes.js
const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema(
  {
    shopId:{
      type:String,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required:true,
    },

    sizes: {
      type: Array, // ["S", "M", "L", "XL"]
      required: true,
    },

    image: {
      type: Array,
      required:true,
    },

    category:{
      type:String,
      required:true,
    },
    subCategory:{
      type:String,
      required:true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    shopData: {
      type: Object,
      required:true,
    },
    date:{
      type:Number,
      required:true,
    }
  },
  { timestamps: true }
);
const clothModel=mongoose.model("clothes", clothesSchema);
module.exports = {clothModel}