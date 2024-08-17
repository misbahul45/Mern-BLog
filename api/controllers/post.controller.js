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

const getAllPostsController = async (req, res, next) => {
    const search = req.query.search;
    const searchType = req.query.title;
    const authorId=req.query.authorId
    const page = Number(req.query.page) || 1;
    const pageSize = 5;
  
    try {
      const allPosts = await db.post.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          authorId,
          title: {
            contains: searchType === "all" ? undefined : searchType,
            mode: "insensitive",
          },
          category: {
            contains: search === 'all' ? undefined : search,
            mode: "insensitive",
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return res.json(allPosts);
    } catch (error) {
      next(error);
    }
  };

const getPostController=async(req, res, next)=>{
    const slug=req.params.slug
    try {
        const post=await db.post.findUnique({
            where:{
                slug
            }
        })
        return res.json(post)
    } catch (error) {
        next(errorHandler(error))
    }
}
  
module.exports={ createPostController, getAllPostsController, getPostController }