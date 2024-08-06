const express=require("express")
const userRouter=require("./routes/user.route")
const authRouter=require("./routes/auth.route")

//configuration
const app=express()
const PORT=process.env.PORT
app.use(express.json())

//routes
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)


app.listen(PORT,()=>{
    console.log("backend server is running on port",PORT)   
})