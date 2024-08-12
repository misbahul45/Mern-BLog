const express=require("express")
const userRouter=require("./routes/user.route")
const authRouter=require("./routes/auth.route")
const cookieParser = require('cookie-parser');

//configuration
const app=express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cookieParser());

//routes
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)

app.listen(PORT,()=>{
    console.log("backend server is running on port",PORT)   
})



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Internal Server Error"
    res.status(statusCode).json({
        success:false,
        status:statusCode,
        message:message,
    })
})