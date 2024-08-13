import { Link, useNavigate } from '@tanstack/react-router'
import { FaArrowRight, FaUser } from 'react-icons/fa6'
import { signOutAction } from '../../libs/actions'
import { useDispatch } from 'react-redux'
import { signoutUser } from '../../redux/user/userSlice'


interface Props{
    tab:string
}

const ProfileSidebar = ({tab}:Props) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
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
    <aside className='lg:w-72 md:w-56 w-full px-4 pt-2 rouded-r-lg flex flex-col gap-4 dark:text-slate-100 font-semibold shadow-xl'>
        <Link to='/profile' search={{ tab: 'profile' }} className={`flex justify-between px-4 py-2 rounded-md items-center hover:bg-slate-400 dark:hover:bg-slate-700  ${tab==='profile' && 'bg-slate-400 dark:bg-slate-700 text-slate-100'}`}>
            <div className="flex gap-2 items-center">
                <FaUser />
                <span>Profile</span>
            </div>
            <span className='px-3 h-full bg-slate-800 rounded'>User</span>
        </Link>
        <button onClick={handleSignout} className='w-full flex gap-2 items-center py-2 pl-4 rounded-md hover:bg-slate-400 dark:hover:bg-slate-700 hover:text-slate-50'>
          <FaArrowRight size={20} />
          <span>Sign Out</span>
        </button>
    </aside>
  )
}

export default ProfileSidebar
