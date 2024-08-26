import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { GoPaperAirplane } from 'react-icons/go'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useNavigate } from '@tanstack/react-router'

interface Props {
    comment:string
    postId:string
    authorId:string
    replayCommentId:string | null
    setReplayCommentId:React.Dispatch<React.SetStateAction<string | null>>
}

const ButtonMessage = ({ comment, postId, authorId, replayCommentId, setReplayCommentId }: Props) => {
    const queryClient = useQueryClient()
    const { currentUser } = useSelector((state: RootState) => state.user)
    const navigate=useNavigate()

    const handleCreateComment =useMutation(
        async () => {
            if(!currentUser){
                return navigate({to:'/sign-in'})
            }

            if(!replayCommentId){
                const res=await fetch('/api/comments', {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        postId,
                        authorId,
                        comment
                    })
                })
                return await res.json()
            }

            const res=await fetch(`/api/comments/${replayCommentId}`, {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    postId,
                    authorId,
                    comment,
                    parentId:replayCommentId 
                })
            })

            return await res.json()
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments'])
                queryClient.invalidateQueries([replayCommentId])
                setReplayCommentId(null)
            }
        }
    )
    
  return (
    <button onClick={()=>handleCreateComment.mutate()} disabled={comment.length===0} className='bg-blue-700 dark:bg-slate-700 text-slate-100 h-11 lg:px-4 px-2.5 md:text-md text-sm rounded font-semibold hover:bg-blue-800 dark:hover:bg-slate-800 transition-all duration-75'>
        {comment.length >0 ? <FaTelegramPlane size={20} /> : <GoPaperAirplane size={20} />}
    </button>
  )
}

export default ButtonMessage
