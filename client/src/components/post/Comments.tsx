import React, { forwardRef, useEffect } from "react"
import FormComments from "./FormComments"
import { useQuery } from "react-query"
import SubUser from "./Comment/SubUser"
import Coment from "./Coment"


interface Props {
  postId: string
  authorId: string
}

const Comments = forwardRef<HTMLDivElement, Props>(({ postId, authorId }, ref) => {
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  const { data:comments }=useQuery(['comments'],async()=>{
    const res=await fetch(`/api/comments/${postId}`)
    const comments=await res.json()
    return comments
  })

  const [replayCommentId, setReplayCommentId]=React.useState<string | null>(null)

  useEffect(() => {
    if (replayCommentId) {
      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      messageRef.current?.focus();
    }
  }, [replayCommentId]);

    return (
        <div ref={ref} className="w-full my-4">
          <h1 className="lg:text-3xl md:text-2xl text-xl dark:text-slate-600 text-slate-500 text-center font-semibold">Post Comments</h1>
          <FormComments ref={messageRef} postId={postId} authorId={authorId} replayCommentId={replayCommentId} setReplayCommentId={setReplayCommentId} />
          <div className="w-full flex flex-col gap-2">
            {comments?.map((comment:Comment) => (
                <Coment key={comment.id} {...comment} setReplayCommentId={setReplayCommentId} replayCommentId={replayCommentId} postId={postId} />
              ))
            }
          </div>
        </div>
      )
})

export default Comments
