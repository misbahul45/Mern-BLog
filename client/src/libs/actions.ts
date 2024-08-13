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