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
          <label className="dark:text-slate-100 font-semibold" htmlFor="username">Your username</label>
          <input type="text" id='username' placeholder='username' {...form.register('username')} className='w-full border-2 border-slate-500 rounded px-2 py-2' />  
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="email">Your email</label>
          <input type="text" id='email' placeholder='email' {...form.register('email')} className='w-full border-2 border-slate-500 rounded px-2 py-2' />
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="password">Your password</label>
        <div className="relative">
          <input type={showPassword?'text':'password'} id='password' placeholder='password' {...form.register('password')} className='w-full border-2 border-slate-500 rounded px-2 py-1' />
          <ShowPassword onClick={handleShowPassword} showPassword={showPassword} />
        </div>
        </div>
        <div className="flex justify-between items-center mt-6">
            <button type='button' className="dark:text-slate-100 font-semibold px-4 py-2 rounded border-2 border-red-600 hover:bg-red-600 transition-all duration-100">Delete Account</button>
            <button type='submit' disabled={loading} className='px-8 bg-gradient-to-r text-white font-bold from-blue-500 via-cyan-500 to-green-500 py-2 flex justify-center shadow-md shadow-slate-900/40 dark:shadow-slate-400/40 rounded hover:opacity-80'>{loading?<Loader size="sm" />:'Update'}</button>
        </div>
    </form>
  )
}

export default FormDash
