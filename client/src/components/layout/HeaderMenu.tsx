import { Link } from "@tanstack/react-router"
import React from "react"
import { AiOutlineMenu, AiOutlineMoon, AiOutlineSun } from "react-icons/ai"

interface HeaderMenuProps{
    setShowNavbar:React.Dispatch<React.SetStateAction<boolean>>
}
const HeaderMenu=({setShowNavbar}:HeaderMenuProps)=>{
    const [isdarkMode, setIsDarkMode]=React.useState(false)
    const isLogin=false
    const handleDarkMode=()=>{
        setIsDarkMode(!isdarkMode)
        document.body.classList.toggle('dark')
    }
    return(
       <div className='flex gap-4 items-center'>
            <button onClick={handleDarkMode} className={`lg:block hidden p-2 rounded-full shadow-md shadow-slate-500/60 border border-slate-900 dark:border-slate-400`}>
                {isdarkMode?
                    <AiOutlineMoon size={20} className='text-slate-100' />
                    :
                    <AiOutlineSun size={20} className='text-yellow-500' />
                }
            </button>
            {isLogin?
                <></>
                :
                <Link to='/sign-in'>
                    <div className="h-[2.4rem] hidden lg:block w-full rounded bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 p-[0.2rem] shadow-md shadow-slate-900/40 dark:shadow-slate-400/40">
                        <div className={`flex h-full w-full items-center justify-center bg-white dark:bg-slate-900 rounded`}>
                            <Link className="lg:text-md text-sm font-black text-black dark:text-white px-4" to='/sign-in'>Sign In</Link>
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