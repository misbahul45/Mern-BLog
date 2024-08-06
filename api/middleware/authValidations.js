const errorHandler = require("../utils/error");

const signupValidation=(req,res,next)=>{
    const { username, email, password }=req.body;
    if(!username || !email || ! password || username==='' || email==='' || password===''){
        return next(errorHandler(400, "username, email and password are required"))
    }
    next()
}

module.exports={ signupValidation }