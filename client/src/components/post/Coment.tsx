import React from "react"
import SubMessage from "./Comment/SubMessage"
import SubUser from "./Comment/SubUser"

interface Props extends Comment{
  setReplayCommentId:React.Dispatch<React.SetStateAction<string | null>>
  replayCommentId:string | null,
  postId:string
  parentId?:string
}
const Coment = ({ id, message, authorId, updatedAt, likes, setReplayCommentId, replayCommentId, postId, parentId }:Props) => {
  return (
    <>
        <div className={`p-2 ${replayCommentId===id && 'bg-slate-200 dark:bg-slate-700 opacity-90'} animate-show-message`}>
          <SubUser commentId={id} authorId={authorId} updatedAt={updatedAt} parentId={parentId} />
          <SubMessage id={id} postId={postId} message={message} likes={likes} setReplayCommentId={setReplayCommentId} replayCommentId={replayCommentId}  commentId={id} />
        </div> 
    </>
  )
}

export default Coment
