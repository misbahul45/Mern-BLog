const { Router } = require("express");
const { createPostController, getAllPostsController } = require("../controllers/post.controller");
const verifyUser = require("../middleware/authVerify");
const { createPostMiddleware } = require("../middleware/postMiddleware");
const router=Router()

router.post("/", verifyUser, createPostMiddleware, createPostController)
router.get('/', getAllPostsController)

module.exports=router