const { hashPassword } = require("../utils/bcryptConfig")
const db = require("../utils/prisma")
const errorHandler = require("../utils/error");

const updateUserController=async(req, res, next)=>{
    const { userId }=req.params
    const { password:updatePassword, username, email, avatar }=req.body 
    if(!username || !email){
        return next(errorHandler(400, "username and email are required"))
    }
    let hashedPassword=''
    if(updatePassword){
        hashedPassword=await hashPassword(updatePassword)
    }
    try {       
        const updatedUser=await db.user.update({
            where:{
                id:userId
            },
            data:{
            ...( updatePassword && { password:hashedPassword }),
            username,
            email,
            ...(avatar && { avatar })
            }
        })
        const { password:_, ...rest }=updatedUser
        return res.json({ success:true, user:rest })
    } catch (error) {
        next(error)
    }
}


module.exports={ updateUserController }