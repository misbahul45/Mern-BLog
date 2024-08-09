interface User{
    id:string,
    email:string,
    username:string 
    avatar?:string  
}
interface MyRouterContext {
    user: User | null
}