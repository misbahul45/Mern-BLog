const express=require("express")
const verifyUser = require("../middleware/authVerify")
const { updateUserController } = require("../controllers/user.controller")

const router=express.Router()

router.patch('/update/:userId', verifyUser, updateUserController)

module.exports=router