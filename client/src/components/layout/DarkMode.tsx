import React from 'react'
import { AiOutlineMoon, AiOutlineSun } from 'react-icons/ai'

interface Props{
    isdarkMode:boolean,
    onClick:()=>void
}

const DarkMode = ({isdarkMode, onClick}:Props) => {
  return (
    <button onClick={onClick} className={`lg:block hidden p-2 rounded-full shadow-md shadow-slate-500/60 border border-slate-900 dark:border-slate-400`}>
        {isdarkMode?
            <AiOutlineMoon size={20} className='text-slate-100' />
            :
            <AiOutlineSun size={20} className='text-yellow-500' />
        }
    </button>
  )
}

export default React.memo(DarkMode)
