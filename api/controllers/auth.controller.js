const { hashPassword } = require("../utils/bcryptConfig")
const errorHandler = require("../utils/error")
const db = require("../utils/prisma")

const signUpController=async(req,res, next)=>{
    const data=req.body
    try {
        const hashedPassword=await hashPassword(data.password)
        const newUser=await db.user.create({
            data:{
                ...data,
                password:hashedPassword
            }
        })
        return res.json({ success:true, message:"Success create user with name "+newUser.username })
    } catch (error) {
       next(errorHandler(400, "username or email has been used"))
    }
}

module.exports={ signUpController }