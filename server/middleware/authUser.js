const jwt=require('jsonwebtoken')

//user authentication middleware

const authUser=async (req,res,next)=>{
    try {
        const uToken=req.headers.utoken
        if(!uToken){
            return res.json({success:false,message:"Not authorized login"})
        }
        const token_decode=jwt.verify(uToken,process.env.JWT_SECRET)
        req.user={userId:token_decode.id}
       
        next()
    } catch (error) {
        console.log(error)
        res.send({success:false,message:error.message})
    }
}
module.exports={authUser}