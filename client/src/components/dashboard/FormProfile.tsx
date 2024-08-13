import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ValidationProfile } from '../../libs/validation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ShowPassword from '../auth/ShowPassword'
import Loader from '../ui/Loader'
import { z } from 'zod'
import { signoutUser, updateFailure, updateStart, updateSuccess } from '../../redux/user/userSlice'
import { sleep } from '../../libs/utils'
import DeleteUser from './DeleteUser'
import { signOutAction } from '../../libs/actions'
import { useNavigate } from '@tanstack/react-router'

interface Props{
    avatar:string | null,
    setAvatar:React.Dispatch<React.SetStateAction<string | null>>
}

const FormProfile = ({avatar, setAvatar}:Props) => {
    const [showPassword,setShowPassword]=React.useState(false)
    const [isSuccess, setIsSuccess]=React.useState(false)
    const navigate=useNavigate()

    const { currentUser, error, loading }=useSelector((state:RootState)=>state.user)
    const dispatch=useDispatch()

    const form=useForm({
        resolver:zodResolver(ValidationProfile),
        defaultValues:{
            username:currentUser?.username,
            email:currentUser?.email,
            password:undefined,
        }
    })

    const handleShowPassword=React.useCallback(()=>{
        setShowPassword(prev=>!prev)
      },[])

    useEffect(()=>{
      if(isSuccess){
        setTimeout(()=>{
          setIsSuccess(false)
        },2000)
      }
    },[isSuccess])  


      const handleUpdateUser=async(values:z.infer<typeof ValidationProfile>)=>{
        const { password,username, email }=values

        const updateData={
          username,
          email,
          ...(password && { password }),
          ...(avatar && { avatar })
        }

        dispatch(updateStart())
        await sleep()
        try {
          const res=await fetch(`/api/users/update/${currentUser.id}`,{
            method:"PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(updateData)
          })
          const data=await res.json()
          dispatch(updateSuccess(data.user))

          //rest
          setIsSuccess(true)
        } catch (error) {
          dispatch(updateFailure(error))
        } finally{
          setAvatar('')
        }
      }

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
    <div className='w-full max-w-md flex flex-col gap-4'>
      <ul className="list-disc list-inside text-red-400 my-4 max-w-md mx-auto">
        {form.formState.errors.username?.message && (
          <li>{form.formState.errors.username.message as string}</li>
        )}
        {form.formState.errors.email?.message && (
          <li>{form.formState.errors.email.message as string}</li>
        )}
        {form.formState.errors.password?.message && (
          <li>{form.formState.errors.password.message as string}</li>
        )}
      </ul>
      <form onSubmit={form.handleSubmit(handleUpdateUser)} className='w-full'>
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
              <DeleteUser />
              <button onClick={handleSignout} type='button' className="dark:text-slate-100 font-semibold px-4 py-2 rounded border-2 border-red-600 hover:bg-red-600  hover:text-slate-100 transition-all duration-100">Sign Out</button>
          </div>
          {isSuccess&&(
            <p className='my-4 py-2 px-4 rounded bg-cyan-200 text-green-700'>Success update profile user</p>
          )}
          {error&&(
            <p className='my-4 py-2 px-4 rounded bg-red-200 text-red-700'>Please input correct all fields</p>
          )}
      </form>
    </div>
  )
}

export default FormProfile
