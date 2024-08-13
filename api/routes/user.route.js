const express=require("express")
const verifyUser = require("../middleware/authVerify")
const { updateUserController, deleteUserController } = require("../controllers/user.controller")

const router=express.Router()

router.patch('/update/:userId', verifyUser, updateUserController)
router.delete('/delete', verifyUser, deleteUserController)

module.exports=router