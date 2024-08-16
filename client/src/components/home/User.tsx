import React from 'react'
import { sleep } from '../../libs/utils'
import Loader from '../ui/Loader'
import moment from 'moment'
import { useQuery } from 'react-query'

interface Props {
    id:string
    updatedAt:string
}

const User = ({ id, updatedAt}:Props) => {

    const { data:user }=useQuery<User>('user', async()=>{
        const res = await fetch(`/api/users/${id}`)
        const data = await res.json()
        await sleep()
        return data
    },
    )

  return (
    <div className='flex items-center justify-between gap-2 w-full'>
      {user?
        <div className='flex gap-2'>
            <img src={user?.avatar} alt={user?.username} className='w-10 h-10 rounded-full' />
            <h1 className='text-lg font-bold text-slate-600 dark:text-slate-100'>{user?.username}</h1>
        </div>  
        :
        <Loader size='md' />
    }
    <span className='text-xs text-slate-400 dark:text-slate-700'>{moment(updatedAt).fromNow()}</span>
    </div>
  )
}

export default User
