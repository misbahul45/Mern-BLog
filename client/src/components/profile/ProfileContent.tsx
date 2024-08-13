import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import FormDash from './FormProfile'
import FormImage from './FormImage'

const ProfileContent = () => {
    const [imageUrl, setImageUrl]=React.useState<string | null>(null)
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const user=currentUser as User
  return (
    <div className='relative flex-1 py-2 flex flex-col items-center justify-center px-4'>
      <h1 className='text-center lg:text-3xl md:text-2xl sm:text-sl text-lg dark:text-slate-100 font-bold mb-4'>User Profile</h1>
      <FormImage avatar={user.avatar} setImageUrl={setImageUrl} imageUrl={imageUrl} />
      <FormDash avatar={imageUrl} setAvatar={setImageUrl} />
    </div>
  )
}

export default ProfileContent
