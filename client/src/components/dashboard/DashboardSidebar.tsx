import { Link } from '@tanstack/react-router'
import { FaUser } from 'react-icons/fa6'


interface Props{
    tab:string
}

const DashboardSidebar = ({tab}:Props) => {
  return (
    <aside className='lg:w-72 md:w-56 w-full px-4 pt-2 rouded-r-lg flex flex-col gap-4 dark:text-slate-100 font-semibold shadow-xl'>
        <Link to='/dashboard' search={{ tab: 'profile' }} className={`flex justify-between px-4 py-2 rounded-md items-center hover:bg-slate-400 dark:hover:bg-slate-700 ${tab==='profile' && 'bg-slate-400 dark:bg-slate-700'}`}>
            <div className="flex gap-2 items-center">
                <FaUser />
                <span>Profile</span>
            </div>
            <span className='px-3 h-full bg-slate-800 rounded'>User</span>
        </Link>
        <button className='w-full text-left py-2 pl-4 rounded-md hover:bg-slate-400 dark:hover:bg-slate-700'>Sign Out</button>
    </aside>
  )
}

export default DashboardSidebar
