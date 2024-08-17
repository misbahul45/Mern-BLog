const { Router } = require("express");
const { createPostController, getAllPostsController, getPostController } = require("../controllers/post.controller");
const verifyUser = require("../middleware/authVerify");
const { createPostMiddleware } = require("../middleware/postMiddleware");
const router=Router()

router.post("/", verifyUser, createPostMiddleware, createPostController)
router.get('/', getAllPostsController)
router.get('/:slug',getPostController)

module.exports=router