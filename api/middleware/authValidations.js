const signupValidation=(req,res,next)=>{
    const { username, email, password }=req.body;
    if(!username || !email || ! password || username==='' || email==='' || password===''){
        return res.status(400).json({ message:"All fields all required" })
    }
    next()
}

module.exports={ signupValidation }