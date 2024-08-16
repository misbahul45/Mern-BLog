const errorHandler = require("../utils/error")
const db = require("../utils/prisma")

const createPostController=async(req, res, next)=>{
    const slug=req.postSlug
    const newPost=req.body

    try {
        await db.post.create({
            data:{
                ...newPost,
                slug
            }
        })
        return res.json({ success:true, message:`Successfully created post` })
    } catch (error) {
        next(errorHandler(error))
    }
}

const getAllPostsController=async(req, res, next)=>{
    try {
        const allPosts=await db.post.findMany({
            orderBy:{
                updatedAt:"desc" 
            },
        })
        return res.json(allPosts)
    } catch (error) {
        next(error)
    }
}

module.exports={ createPostController, getAllPostsController }