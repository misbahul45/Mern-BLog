
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationSignUp } from '../../libs/validation'
import { z } from 'zod'
import React, { useEffect } from "react"
import ShowPassword from "./ShowPassword"
import { useNavigate } from "@tanstack/react-router"
import ShowNotif from "./ShowNotif"
import Loader from "../ui/Loader"
import { sleep } from "../../libs/utils"
import AuthInformation from "./AuthInformation"

const FormSignup = () => {
  const navigate=useNavigate()

  const [showPassword,setShowPassword]=React.useState(false)
  const [loading, setLoading]=React.useState<boolean>(false)
  const [error,setError]=React.useState<string>('')

  const form=useForm<z.infer<typeof ValidationSignUp>>({
    resolver:zodResolver(ValidationSignUp),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

  const handleShowPassword=React.useCallback(()=>{
    setShowPassword(prev=>!prev)
  },[])

  const handleSignup=async(values:z.infer<typeof ValidationSignUp>)=>{
    setLoading(true)
    await sleep()
    try{
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(values)
      })
      const data=await res.json()
      if(data.success){
        navigate({
          to:"/sign-in"
        })
      }else{
        throw new Error(data.message)
      }
    }catch(err:any){
      setError(err.message)
    }finally{
      form.reset({
        username:'',
        email:'',
        password:''
      })
      setLoading(false)
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      setError('')  
    },2000)
  },[error])

  return (
    <div className="w-full relative overflow-hidden">
      <AuthInformation errors={form.formState.errors} />
      <form onSubmit={form.handleSubmit(handleSignup)} className='w-full max-w-sm mx-auto'>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="username">Your username</label>
          <input type="text" id='username' placeholder='username' {...form.register('username')} className='w-full border-2 border-slate-500 rounded px-2 py-1' />  
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-slate-100 font-semibold" htmlFor="email">Your email</label>
          <input type="text" id='email' placeholder='email' {...form.register('email')} className='w-full border-2 border-slate-500 rounded px-2 py-1' />
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
      <ShowNotif error={error}  />
    </div>
  )
}

export default FormSignup
