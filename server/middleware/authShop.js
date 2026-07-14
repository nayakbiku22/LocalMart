const jwt=require('jsonwebtoken')
const authShop=async (req,res,next)=>{
    try {
        const {stoken}=req.headers
        if(!stoken){
            return res.json({success:false,message:"Unauthorized Login"})
        }
        const token_decode=jwt.verify(stoken,process.env.JWT_SECRET)
        req.user={shopId:token_decode.id}
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
module.exports={authShop}