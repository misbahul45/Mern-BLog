const { hashPassword } = require("../utils/bcryptConfig")
const db = require("../utils/prisma")

const signUpController=async(req,res)=>{
    const data=req.body
    try {
        const hashedPassword=await hashPassword(data.password)
        const newUser=await db.user.create({
            data:{
                ...data,
                password:hashedPassword
            }
        })
        return res.json({ success:true, message:"Success create user" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success:false,message:"username or email has been used" })
    }
}

module.exports={ signUpController }