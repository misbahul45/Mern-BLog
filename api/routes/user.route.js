const express=require("express")
const verifyUser = require("../middleware/authVerify")
const { updateUserController, deleteUserController, getUserController } = require("../controllers/user.controller")

const router=express.Router()

router.get('/:userId', getUserController)
router.patch('/update/:userId', verifyUser, updateUserController)
router.delete('/delete', verifyUser, deleteUserController)

module.exports=router