import { Link, useNavigate } from "@tanstack/react-router"
import { useMutation, useQueryClient } from "react-query"

interface Props{
    data:Post[]
    heades:string[]
}
const Table = ({data, heades}:Props) => {
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const handleDelete=useMutation(
        async (id:string)=>{
            try {
                await fetch(`/api/posts/${id}`, {
                    method:'DELETE',
                })
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        {
            onSuccess:async()=>{
                queryClient.invalidateQueries(['posts'])
            }
        }
    )

    const handleEdit=(slug:string)=>{
        navigate({to:`/new-story/$slug`, params:{ slug}})
    }

  return (
    <div className="w-full px-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {heades.map((head, index)=><th key={index} className="border-b dark:border-slate-600 font-medium p-4 whitespace-nowrap text-slate-400">{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((post, index)=>(
            <tr key={index} className="border-b dark:border-slate-600">
                <td className="lg:p-4 p-2">
                    <span className="lg:text-2xl md:text-lg text-md font-semibold dark:text-slate-100">{index+1}</span>
                </td>
                <td className="lg:p-4 p-2">
                    <Link to="/post/$slug" params={{ slug:post.slug }} className="lg:text-xl md:text-lg text-xs font-semibold dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-500 hover:border-b-2 hover:border-b-blue-800">{post.title}</Link>
                </td>
                <td className="lg:p-4 p-2">
                    <img src={post.image} alt={post.title} loading="lazy" className="lg:w-32 lg:h-24 w-16 h-12 bg-cover" />
                </td>
                <td className="lg:p-4 p-2 h-full flex md:flex-row flex-col items-center gap-4">
                    <button onClick={()=>handleEdit(post.slug)} className="px-4 py-2 lg:text-md text-xs rounded-md font-semibold bg-blue-600 text-slate-100 hover:scale-105 transition-all duration-100">Edit</button>
                    <button onClick={()=>handleDelete.mutate(post.id.toString())} className="px-4 py-2 lg:text-md text-xs rounded-md font-semibold bg-red-800 text-slate-100 hover:scale-105 transition-all duration-100">Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
