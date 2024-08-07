import { Link } from "@tanstack/react-router"
import React from "react"
import { AiOutlineMenu } from "react-icons/ai"
import DarkMode from "./DarkMode"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

interface HeaderMenuProps{
    setShowNavbar:React.Dispatch<React.SetStateAction<boolean>>
}
const HeaderMenu=({setShowNavbar}:HeaderMenuProps)=>{
    const [isdarkMode, setIsDarkMode]=React.useState(false)
    const { currentUser }=useSelector((state:RootState)=>state.user)

    const handleDarkMode=React.useCallback(()=>{
        setIsDarkMode(!isdarkMode)
        document.body.classList.toggle('dark')
    },[isdarkMode])

    return(
       <div className='flex gap-4 items-center'>
            <DarkMode  isdarkMode={isdarkMode} onClick={handleDarkMode} />
            {currentUser?
                <button className="px-4 py-1.5 font-semibold rounded bg-red-600 text-slate-100 hover:bg-red-700">
                    Logout
                </button>
                :
                <Link to='/sign-in'>
                    <div className="h-[2.4rem] hidden lg:block w-full rounded bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 p-[0.2rem] shadow-md shadow-slate-900/40 dark:shadow-slate-400/40">
                        <div className={`flex h-full w-full items-center justify-center bg-white dark:bg-slate-900 rounded`}>
                            <span className="lg:text-md text-sm font-black text-black dark:text-white px-4">Sign In</span>
                        </div>
                    </div>
                </Link>
            }
            <button onClick={()=>setShowNavbar(prev=>!prev)} className='lg:hidden block p-2.5 rounded-full shadow-md shadow-slate-800/60 dark:shadow-slate-400/60 border border-slate-800 dark:border-slate-400'>
                <AiOutlineMenu className='text-xl dark:text-slate-100' />
            </button>
       </div> 
    )
}

export default HeaderMenu