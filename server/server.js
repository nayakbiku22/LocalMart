

const express = require("express");
const app = express();
const port = process.env.PORT||8080;
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");   // Connecting db connection code
const {connectCloudinary}=require("./config/cloudinary.js")
const { adminRouter } = require("./routes/AdminRoute");
const { shopRouter } = require("./routes/ShopRoute");
require("dotenv").config();
const dns=require("dns");
const { userRouter } = require("./routes/userRoute.js");
dns.setServers(["1.1.1.1","8.8.8.8"])

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
connectDB();
connectCloudinary()

app.get("/", (req,res) => {
    res.send("App is running");
});

// app.use((req, res, next) => {
//     console.log("REQUEST RECEIVED")
//     console.log(req.method)
//     console.log(req.url)
//     console.log(req.body)
//     next()
// })

app.use("/api/admin",adminRouter);
app.use("/api/shop",shopRouter);
app.use("/api/user",userRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
