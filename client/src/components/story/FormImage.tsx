
import { FaImage } from 'react-icons/fa6'

const FormImage = () => {
  return (
    <div className='w-full max-w-xl h-56 border-4 border-dotted border-slate-400 dark:border-slate-600 rounded-xl p-14 cursor-pointer hover:scale-105 transition-all duration-100 group'>
        <FaImage className='w-full h-full dark:text-slate-400 group-hover:dark:text-slate-200  group-hover:text-slate-900' />
        <p className='text-center text-lg dark:text-slate-400 font-semibold'>ImagePost</p>
    </div>
  )
}

export default FormImage
