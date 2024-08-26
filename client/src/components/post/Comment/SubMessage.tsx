import React from 'react'
import { FaHandsClapping } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Coment from '../Coment';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';

interface Props{
  commentId:string
  message:string
  setReplayCommentId:React.Dispatch<React.SetStateAction<string | null>>
  replayCommentId:string | null,
  postId:string
  id?:string
}

const SubMessage = ({ id, message, setReplayCommentId, replayCommentId, commentId, postId }:Props) => {
  const queryClient=useQueryClient()
  const { currentUser }=useSelector((state:RootState)=>state.user)
  const navigate=useNavigate()

  const { data:childrenComments }=useQuery<Comment[]>([commentId],async()=>{
    const res=await fetch(`/api/comments/${postId}/${commentId}`)
    const comments=await res.json()
    return comments
  })


  const { data:likes }=useQuery<Like[]>(['likes',commentId],async()=>{
    const res=await fetch(`/api/likes/${commentId}`)
    const likes=await res.json()
    return likes
  })

  const handleLikes=useMutation(
    async()=>{
      if(!currentUser){
        return navigate({to:'/sign-in'})
    }

      const res=await fetch(`/api/likes/${commentId}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ commentId })
      })
      const data=await res.json()
      return data
    },{
      onSuccess:()=>{
        queryClient.invalidateQueries(['likes',commentId])
      }
    })

  const [showChildren, setShowChildren]=React.useState<boolean>(false)

  const getReplayComment=()=>{
    if(replayCommentId===commentId){
      setReplayCommentId(null)
      return ;
    }
    setReplayCommentId(commentId)
  }

  return (
    <>
      <p className="dark:text-slate-100 text-sm md:text-md">{message}</p>
      <div className='flex items-center justify-between py-1'>
        <div className="flex gap-4 items-center">
            <div className='flex items-center gap-1'>
              <button onClick={()=>handleLikes.mutate()} className={`p-2 ${likes?.some(like=>like.authorId===currentUser?.id)?'bg-blue-600 text-slate-100':'bg-slate-200 dark:bg-slate-700'} rounded-full hover:scale-110 transition-all duration-100`}>
                <FaHandsClapping className='dark:text-slate-100' />
              </button>
              <span className='text-sm dark:text-slate-100'>{likes?.length}</span>
            </div>
            <div className={`${childrenComments?.length===0 && 'hidden'} flex items-center gap-1`}>
              <button onClick={() => setShowChildren(prev=>!prev)} className='p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:scale-110 transition-all duration-100'>
                <LuMessageCircle className='dark:text-slate-100' />
              </button>
              <p className='text-sm dark:text-slate-100'>{childrenComments?.length} Replay</p>
            </div>
        </div>
        <button onClick={getReplayComment} className='text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-100'>{replayCommentId===commentId ? 'Cancel' : 'Replay'}</button>
      </div>
      {showChildren && (
        <div className='ml-2 pl-1 border-l-2 border-l-slate-400 dark:border-l-slate-500'>
          {childrenComments?.map((comment:Comment) => (
            <Coment key={comment.id} {...comment} setReplayCommentId={setReplayCommentId} replayCommentId={replayCommentId} postId={postId} parentId={id} />
          ))}
        </div> 
      )}
    </>
  )
}

export default SubMessage
