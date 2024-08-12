import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ValidationProfile } from '../../libs/validation'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ShowPassword from '../auth/ShowPassword'
import Loader from '../ui/Loader'

interface Props{
    avatar?:string
}

const FormDash = ({avatar}:Props) => {
    const [showPassword,setShowPassword]=React.useState(false)
    const [loading, setLoading]=React.useState<boolean>(false)
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const form=useForm({
        resolver:zodResolver(ValidationProfile),
        defaultValues:{
            username:currentUser?.username,
            email:currentUser?.email,
            password:""
        }
    })

    const handleShowPassword=React.useCallback(()=>{
        setShowPassword(prev=>!prev)
      },[])

  return (
    <form className='w-full max-w-sm mx-auto'>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="username">Your username</label>
          <input type="text" id='username' placeholder='username' {...form.register('username')} className='w-full border-2 border-slate-500 rounded px-2 py-2' />  
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="email">Your email</label>
          <input type="text" id='email' placeholder='email' {...form.register('email')} className='w-full border-2 border-slate-500 rounded px-2 py-2' />
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="password">Your password</label>
        <div className="relative">
          <input type={showPassword?'text':'password'} id='password' placeholder='password' {...form.register('password')} className='w-full border-2 border-slate-500 rounded px-2 py-1' />
          <ShowPassword onClick={handleShowPassword} showPassword={showPassword} />
        </div>
        </div>
        <button type='submit' disabled={loading} className='my-6 w-full dark:text-white font-bold bg-transparent border-2 border-blue-600 hover:bg-gradient-to-tr hover:text-white from-blue-700 via-cyan-700 to-green-700 py-2 flex justify-center shadow-md shadow-slate-900/40 dark:shadow-slate-400/40 rounded hover:opacity-80 transition-all duration-100'>{loading?<Loader size="sm" />:'Update'}</button>
        <div className="flex justify-between items-center">
            <button type='button' className="dark:text-slate-100 font-semibold px-4 py-2 rounded border-2 border-red-600 hover:bg-red-600  hover:text-slate-100 transition-all duration-100">Delete Account</button>
            <button type='button' className="dark:text-slate-100 font-semibold px-4 py-2 rounded border-2 border-red-600 hover:bg-red-600  hover:text-slate-100 transition-all duration-100">Sign Out</button>
        </div>
    </form>
  )
}

export default FormDash
