import { Link } from "@tanstack/react-router"

const Logo=()=>{
    return(
        <Link to='/'>
            <span className='3xl:text-2xl lg:text-xl md:text-md text-sm lg:px-3 px-2 py-1.5 rounded-md bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 font-bold text-white'>Misbahul&#39;s</span>
            <span className='lg:font-bold font-semibold dark:text-slate-100'>Blogs</span>
        </Link>
    )
}

export default Logo