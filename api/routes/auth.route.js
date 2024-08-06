const express=require("express")
const { signUpController } = require("../controllers/auth.controller")
const { signupValidation } = require("../middleware/authValidations")

const router=express.Router()

router.post('/signup',signupValidation,signUpController)

module.exports=router