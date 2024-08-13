import { Link, useNavigate } from "@tanstack/react-router"
import React from "react"
import { useDispatch } from "react-redux"
import { signOutAction } from "../../libs/actions"
import { signoutUser } from "../../redux/user/userSlice"

interface Props{
    avatar:string,
    username:string
    email:string
}
const ProfileMenu = ({ avatar,username, email }:Props) => {
    const [showMenu, setShowMenu]=React.useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const toggleShowMenu=()=>{
        setShowMenu(prev=>!prev)
    }

    const handleSignout=async()=>{
        const isTrue=await signOutAction()
        if(isTrue){
          dispatch(signoutUser())
          navigate({
            to:'/'
          })
        }
      }
  return (
    <div className="relative flex items-center">
        <button onClick={toggleShowMenu}>
            <img src={avatar} alt={avatar} className="lg:size-10 size-8 rounded-full object-cover" />
        </button>
        {showMenu&&(
            <div className="animate-show-profile-menu px-2.5 py-2 absolute top-[120%] -right-10 border-2 backdrop-blur-md rounded-xl bg-slate-300 dark:bg-slate-900">
                <h1 className="lg:text-xl text-md font-bold dark:text-slate-400">{username}</h1>
                <p className="text-sm font-semibold dark:text-slate-400">{email}</p>
                <ul className="border-t-2 border-t-slate-600 dark:text-slate-400 w-full py-1">
                    <li onClick={toggleShowMenu} className="hover:bg-slate-300 hover:dark:bg-slate-600 rounded-md transition-all duration-100">
                        <Link to="/profile" search={{ tab: 'profile' }} className="w-full h-full py-2 pl-2 block text-sm font-semibold hover:text-slate-900 dark:hover:text-white transition-all duration-100">Profile</Link>
                    </li>
                    <li onClick={toggleShowMenu} className="hover:bg-slate-300 hover:dark:bg-slate-600 rounded-md transition-all duration-100">
                        <Link to="/new-story" className="w-full h-full py-2 pl-2 block text-sm font-semibold hover:text-slate-900 dark:hover:text-white transition-all duration-100">Profile</Link>
                    </li>
                    <li onClick={toggleShowMenu} className="hover:bg-slate-300 hover:dark:bg-slate-600 rounded-md transition-all duration-100">
                        <button onClick={handleSignout} className="py-2 pl-2 text-left w-full h-full block text-sm font-semibold hover:text-slate-900 dark:hover:text-white transition-all duration-100">Logout</button>
                    </li>
                </ul>
            </div>
        )}
    </div>
  )
}

export default ProfileMenu
