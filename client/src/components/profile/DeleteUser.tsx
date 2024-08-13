import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/user/userSlice";

const DeleteUser = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleDeleteUser=async()=>{
        const isConfirm=confirm('Are You Sure')
        if(!isConfirm){
            return;
        }
        try {
            await fetch('/api/users/delete',{
                method:"DELETE"
            })
            dispatch(deleteUser())
            navigate({
                to:'/sign-up'
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button onClick={handleDeleteUser} type='button' className="dark:text-slate-100 font-semibold px-4 py-2 rounded border-2 border-red-600 hover:bg-red-600  hover:text-slate-100 transition-all duration-100">Delete Account</button>
  )
}

export default DeleteUser
