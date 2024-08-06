import { createFileRoute, Link } from '@tanstack/react-router'
import FormSignup from '../../components/auth/FormSignup'
export const Route = createFileRoute('/_auth/sign-up')({
  component:SignUpPage
})


function SignUpPage() {
  return(
    <section className='w-full min-h-[calc(100vh-4rem)] flex lg:flex-row flex-col items-center justify-center gap-8 xl:px-12 lg:px-8 md:px-6 sm:px-4 px-2 py-4'>
        <div>
          <div className="text-center">
            <span className='3xl:text-4xl lg:text-3xl md:text-2xl text-xl lg:px-3 px-2 py-1.5 rounded-md bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 font-bold text-white'>Misbahul&#39;s</span>
            <span className='3xl:text-3xl lg:text-2xl md:text-xl text-lg lg:font-bold font-semibold dark:text-slate-100'>Blogs</span>
          </div>
          <p className='mt-6 text-center dark:text-slate-100 lg:text-lg lg:font-semibold opacity-95'>This is My demo blog projects you can sign up by login with your email and password or using your account with google </p>
        </div>
        <div className="w-full">
          <FormSignup />
          <p className='text-center mt-4 dark:text-slate-100'>Already have an account? <Link to="/sign-in" className='text-green-500'>Sign In</Link></p>
        </div>
    </section>
  )
}