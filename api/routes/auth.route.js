const express=require("express")
const { signUpController, signInController } = require("../controllers/auth.controller")
const { signupValidation, signinValidation } = require("../middleware/authValidations")

const router=express.Router()

router.post('/signup',signupValidation,signUpController)
router.post('/signin', signinValidation, signInController)

module.exports=router