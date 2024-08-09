import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import FormDash from './FormDash'

const DashboardProfile = () => {
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const user=currentUser as User
  return (
    <div className='flex-1 py-2 flex flex-col gap-4 items-center'>
      <h1 className='text-center lg:text-3xl md:text-2xl sm:text-sl text-lg dark:text-slate-100 font-semibold'>Profile</h1>
      <div className="p-1.5 rounded-full bg-slate-700">
        <img src={user?.avatar} alt="user avatar" className='size-20 rounded-full' />
      </div>
      <FormDash />
    </div>
  )
}

export default DashboardProfile
