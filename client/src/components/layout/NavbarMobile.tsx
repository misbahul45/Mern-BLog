import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { toggleDarkMode } from "../../redux/theme/themeSlice"
import { signOutAction } from "../../libs/actions"
import { signoutUser } from "../../redux/user/userSlice"

interface NavbarMobileProps{
    showNavbar:boolean
}

const NavbarMobile=({showNavbar}:NavbarMobileProps)=>{
    const pathName=useLocation().pathname
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const { darkMode }=useSelector((state:RootState)=>state.theme)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleDarkMode=()=>{
        dispatch(toggleDarkMode())
        document.body.classList.toggle('dark')
    }

    const handleSignout=async()=>{
        const isTrue=await signOutAction()
        if(isTrue){
          dispatch(signoutUser())
          navigate({
            to:'/sign-in',
            search: {
              search: 'all',
            }
          })
        }
      }
      const toHome=()=>{
        navigate({
          to:'/',
          replace:true,
          
        })
      }

    if(!showNavbar) return null
    return(
        <nav className='animate-show-mobile-nav lg:hidden flex flex-col w-full absolute top-16 left-0 bg-slate-50 dark:bg-slate-800 border-b-2 border-slate-400 dark:border-slate-500 rounded-b-xl font-semibold z-50'>
            <button onClick={toHome} className={`${pathName==="/"?"bg-slate-200 dark:bg-slate-700":""} py-2 text-center hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-300`} >Home</button>
            <Link className={`${pathName=="/about"?"bg-slate-200 dark:bg-slate-700":""} py-2 text-center hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-300`} to='/about'>About</Link>
            <Link className={`${pathName=="/projects"?"bg-slate-200 dark:bg-slate-700":""} py-2 text-center hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-300`} to='/projects'>Projects</Link>
            <div className='flex gap-4 my-2 py-2 justify-center items-center'>
                <button onClick={handleDarkMode} className={`lg:hidden block px-4 py-2 rounded shadow-md shadow-slate-500/60 border border-slate-900 dark:border-slate-400`}>
                    {darkMode?
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
                {currentUser?
                    <button onClick={handleSignout} className="px-6 py-2 rounded-md bg-red-600 text-slate-100 active:opacity-85">Sign out</button>
                    :
                    <>
                        <Link to='/sign-in' className='bg-gradient-to-r from-blue-600 dark:from-slate-600 to-cyan-500 dark:to-gray-900 px-8 py-2 rounded-full shadow-md shadow-slate-500/60 border border-slate-900 dark:border-slate-400 text-slate-100'>Sign In</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default NavbarMobile