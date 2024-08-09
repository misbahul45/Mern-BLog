const express=require("express")
const { signUpController, signInController, authByGoogleController } = require("../controllers/auth.controller")
const { signupValidation, signinValidation } = require("../middleware/authValidations")

const router=express.Router()

router.post('/signup',signupValidation,signUpController)
router.post('/signin', signinValidation, signInController)
router.post('/google', authByGoogleController)

module.exports=router