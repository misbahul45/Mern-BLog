import { forwardRef } from "react"

const Comment = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <div ref={ref} className="w-full my-4">
          <h1 className="lg:text-3xl md:text-2xl text-xl dark:text-slate-600 text-slate-500 text-center font-semibold">Post Comments</h1>
        </div>
      )
})

export default Comment
