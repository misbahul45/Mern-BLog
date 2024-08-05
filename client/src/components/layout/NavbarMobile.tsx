import { Link, useLocation } from "@tanstack/react-router"
import React from "react"
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai"

interface NavbarMobileProps{
    showNavbar:boolean
}

const NavbarMobile=({showNavbar}:NavbarMobileProps)=>{
    const pathName=useLocation().pathname

    const [isdarkMode, setIsDarkMode]=React.useState(false)
    const isLogin=false
    const handleDarkMode=()=>{
        setIsDarkMode(!isdarkMode)
        document.body.classList.toggle('dark')
    }
    if(!showNavbar) return null
    return(
        <nav className='animate-show-mobile-nav lg:hidden flex flex-col w-full absolute top-16 left-0 backdrop-blur-sm dark:bg-slate-800 border-b-2 border-slate-400 dark:border-slate-500 rounded-b-xl font-semibold'>
            <Link className={`${pathName==="/"?"bg-slate-200 dark:bg-slate-700":""} py-2 text-center hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-300`} to='/'>Home</Link>
            <Link className={`${pathName=="/about"?"bg-slate-200 dark:bg-slate-700":""} py-2 text-center hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-300`} to='/about'>About</Link>
            <Link className={`${pathName=="/projects"?"bg-slate-200 dark:bg-slate-700":""} py-2 text-center hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-300`} to='/projects'>Projects</Link>
            <div className='flex gap-4 my-2 py-2 justify-center'>
                <button onClick={handleDarkMode} className={`lg:hidden block px-4 py-2 rounded shadow-md shadow-slate-500/60 border border-slate-900 dark:border-slate-400`}>
                    {isdarkMode?
                        <div className='flex gap-2 items-center text-slate-100'>
                            <AiOutlineMoon size={20} />
                            <span>Dark Mode</span>
                        </div>
                        :
                        <div className='flex gap-2 items-center'>
                            <AiOutlineSun size={20} className='text-yellow-500' />
                            <span>Light Mode</span>
                        </div>
                    }
                </button>
                {isLogin?
                    <></>
                    :
                    <>
                        <Link to='/sign-in' className='bg-gradient-to-r from-blue-600 dark:from-slate-600 to-cyan-500 dark:to-gray-900 px-4 py-2 rounded-full shadow-md shadow-slate-500/60 border border-slate-900 dark:border-slate-400 text-slate-100'>Sign In</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default NavbarMobile