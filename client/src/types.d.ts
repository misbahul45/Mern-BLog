interface User{
    id:string,
    email:string,
    username:string 
    avatar:string  
}
interface MyRouterContext {
    user: User | null
}
interface Post{
    id:string
    title:string
    desc:string
    category:string
    authorId:string
    slug:string
    image:string
    updatedAt:string
}

interface Comment{
    id:string
    postId:string
    authorId:string
    message:string
    likes:number
    updatedAt:string
}

interface Like{
    id:string
    commentId:string
    authorId:string
}