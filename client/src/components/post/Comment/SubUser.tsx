import { useNavigate } from '@tanstack/react-router';
import { CgRemoveR } from 'react-icons/cg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import moment from 'moment';

interface Props {
    authorId:string
    commentId:string
    updatedAt:string
    parentId?:string
}
const SubUser = ({authorId, commentId, updatedAt, parentId}:Props) => {
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const queryClient=useQueryClient()

    const { data: user } = useQuery<User>(
        ['user', authorId],
        async () => {
          const res = await fetch(`/api/users/${authorId}`);
          const data = await res.json();
          return data;
        },
      );
      
      const navigate=useNavigate()

      const goToUser=()=>{
        navigate({
          to:'/user/$id',
          params:{id:authorId}
        })
      }

      const handleDeleteComments=useMutation(
        async()=>{
          const res=await fetch(`/api/comments/${commentId}`,{
            method:"DELETE"
          })
          return await res.json()
        },
        {
          onSuccess:()=>{ 
            queryClient.invalidateQueries(['comments'])
            queryClient.invalidateQueries([parentId])
          }
        }
      )

  return (
    <div className='w-full flex justify-between'>
      <div onClick={goToUser} className='flex items-center gap-2 cursor-pointer'>
        <div className="size-8">
         <img src={user?.avatar} alt={user?.username} loading='lazy' className="w-full h-full rounded-full object-cover" />
        </div>
        <h1 className='text-sm font-semibold text-slate-300 dark:text-slate-600'>{user?.username}</h1>
      </div>
      
      <div className='flex gap-4 items-center'>
        <p className='text-xs text-slate-300 dark:text-slate-500'>{moment(updatedAt).fromNow()}</p>
        {currentUser?.id===authorId && (
          <button onClick={()=>handleDeleteComments.mutate()} className='dark:text-slate-200'>
            <CgRemoveR />
          </button>
        )}
      </div>
    </div>
  )
}

export default SubUser
