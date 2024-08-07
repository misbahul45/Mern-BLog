import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationSignIn } from '../../libs/validation'
import { z } from 'zod'
import React, { useEffect } from "react"
import ShowPassword from "./ShowPassword"
import { useNavigate } from "@tanstack/react-router"
import ShowNotif from "./ShowNotif"
import Loader from "../ui/Loader"
import { sleep } from "../../libs/utils"
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const FormSignin = () => {
  const dispatch=useDispatch()
  const { error, loading }=useSelector((state:RootState)=>state.user)

  const navigate=useNavigate()
  const [showPassword,setShowPassword]=React.useState(false)

  const form=useForm<z.infer<typeof ValidationSignIn>>({
    resolver:zodResolver(ValidationSignIn),
    defaultValues:{
      data:'',
      password:''
    }
  })

  const handleShowPassword=React.useCallback(()=>{
    setShowPassword(prev=>!prev)
  },[])

  const handleSignin=async(values:z.infer<typeof ValidationSignIn>)=>{
    dispatch(signInStart())
    await sleep()
    try{
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(values)
      })
      const data=await res.json()
      if(data.success){
        navigate({to:'/'})
        dispatch(signInSuccess(data.user))
      }else{
        throw new Error(data.message)
      }
    }catch(err:any){
      dispatch(signInFailure(err.message))
    }finally{
      form.reset({
        data:'',
        password:''
      })
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      if(error){
        dispatch(signInFailure(null))
      }
    },2000)
  },[error])

  return (
    <div className="w-full relative overflow-hidden">
      <ul className="list-disc list-inside text-red-400 my-4 max-w-md mx-auto">
       {form.formState.errors.data && <li>{form.formState.errors.data.message}</li>}
       {form.formState.errors.password && <li>{form.formState.errors.password.message}</li>}
      </ul>
      <form onSubmit={form.handleSubmit(handleSignin)} className='w-full max-w-sm mx-auto'>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="data">Your username or email</label>
          <input type="text" id='data' placeholder='username or email' {...form.register('data')} className='w-full border-2 border-slate-500 rounded px-2 py-1' />
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="password">Your password</label>
        <div className="relative">
          <input type={showPassword?'text':'password'} id='password' placeholder='password' {...form.register('password')} className='w-full border-2 border-slate-500 rounded px-2 py-1' />
          <ShowPassword onClick={handleShowPassword} showPassword={showPassword} />
        </div>
        </div>
        <button type='submit' disabled={loading} className='mt-4 w-full bg-gradient-to-r text-white font-bold from-blue-500 via-cyan-500 to-green-500 py-1.5 flex justify-center shadow-md shadow-slate-900/40 dark:shadow-slate-400/40 rounded hover:opacity-80'>{loading?<Loader size="sm" />:'Sign Up'}</button>
      </form>
      <ShowNotif error={error || ''}  />
    </div>
  )
}

export default FormSignin
