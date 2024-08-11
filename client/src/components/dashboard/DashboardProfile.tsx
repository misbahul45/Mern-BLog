import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import FormDash from './FormDash'
import FormImage from './FormImage'

const DashboardProfile = () => {
    const [imageUrl, setImageUrl]=React.useState<string | null>(null)
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const user=currentUser as User
  return (
    <div className='relative flex-1 py-2 flex flex-col gap-4 items-center px-4'>
      <h1 className='text-center lg:text-3xl md:text-2xl sm:text-sl text-lg dark:text-slate-100 font-semibold'>Profile</h1>
      <FormImage  avatar={user.avatar} setImageUrl={setImageUrl} imageUrl={imageUrl} />
      <FormDash />
    </div>
  )
}

export default DashboardProfile
