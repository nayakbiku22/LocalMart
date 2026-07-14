// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type:Object,
      required:true,
    },

    contact: {
      type: Number,
      required: true,
    },
    cartData:{
      type:[
        {
           product:{
          type:Object,
          required:true,
        },
        category:{
          type:String,
          required:true
        }
        }
       
      ],
      default:[]
    }
  },
  { timestamps: true }
);
const userModel=mongoose.model("users", userSchema);
module.exports = {userModel}