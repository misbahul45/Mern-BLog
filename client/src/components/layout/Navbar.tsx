import { Link, useLocation } from "@tanstack/react-router"
import React from "react"

const Navbar=()=>{
    const pathName=useLocation().pathname
    const navClass=React.useMemo(()=>{
        if(pathName==="/"){
            return "w-[4rem] left-0"
        }else if(pathName==='/about'){
            return "w-16 left-[31%]"
        }else if(pathName==='/projects'){
            return "w-20 left-[61%]"
        }
        return ""
    },[pathName])
    return(
        <nav className='lg:flex hidden gap-4 relative pb-1 px-2 text-lg font-semibold'>
            <Link className={`${pathName==="/" ? " text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"} hover:text-slate-900 dark:hover:text-white`} to='/'>Home</Link>
            <Link className={`${pathName==="/about" ? " text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"} text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white`} to='/about'>About</Link>
            <Link className={`${pathName==="/projects" ? " text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"} text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white`} to='/projects'>Projects</Link>
            <span className={`${navClass} absolute bottom-0 h-[0.2rem] rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-red-600 transition-all duration-100 ease-in`}></span>
        </nav>
    )
}

export default Navbar