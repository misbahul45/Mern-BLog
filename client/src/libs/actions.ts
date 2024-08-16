export const signOutAction=async()=>{
    try {
        const res=await fetch('/api/auth/signout',{
            method:"POST"
        })
        const isSucces=await res.json()
        if(isSucces.message){
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

export const creaePostAction=async(post:Partial<Post>)=>{
        const res=await fetch('/api/posts', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(post)
        })
        const data=await res.json()
        return data
}