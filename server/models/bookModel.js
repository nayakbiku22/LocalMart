// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    shopData: {
      type: Object,
      required:true,
    },
     date:{
      type:Number,
      required:true
    },
  },
  { timestamps: true }
);
const bookModel=mongoose.model("book", bookSchema);
module.exports = {bookModel}