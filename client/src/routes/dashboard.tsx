import { createFileRoute, Navigate } from '@tanstack/react-router'
import Sidebar from '../components/ui/ProfileSidebar'
import { useQuery } from 'react-query'
import { z } from 'zod'
import Table from '../components/ui/Table'

const SearchSchmema=z.object({
  authorId:z.string().optional()
})

const TablePosts=['No', 'Title', 'image', 'Actions']

export const Route = createFileRoute('/dashboard')({
  component:Dashboard,
  validateSearch:({ params })=>SearchSchmema.parse(params || {}),
})

function Dashboard() {
  const {authorId}=Route.useSearch()
  if(!authorId){
    return <Navigate to='/sign-in' />
  }

  const {data:posts}=useQuery<Post[]>(['posts'],async()=>{
    const res=await fetch(`/api/posts?authorId=${authorId}`)
    const posts=await res.json()
    return posts
  })

  const {data:comments}=useQuery(['comments'],async()=>{
    const res=await fetch(`/api/posts/comments`)
    const comments=await res.json()
    return comments
  })

  console.log(comments)
  return (
    <section className='w-full min-h-[calc(100vh-4rem)] flex md:flex-row flex-col'>
      <Sidebar tab='dashboard' />
      <div className='w-full flex-1 py-2'>
        <h1 className='text-center lg:text-5xl sm:text-3xl text-2xl font-semibold dark:text-cyan-600'>Dashboard</h1>
        <div className='w-full max-w-xl flex md:gap-8 gap-4 py-2 px-4 mx-auto mt-4'>
          <div className='py-2 w-full rounded-lg shadow-xl shadow-slate-400/30 dark:shadow-slate-500/30 border-2 border-slate-300 dark:border-slate-600'>
            <h1 className='text-center lg:text-xl sm:text-lg font-semibold dark:text-cyan-600'>Stories</h1>
            <p className='text-center font-bold text-slate-300 dark:text-slate-500 text-2xl'>{posts?.length} Posts</p>
          </div>
          <div className='py-2 w-full rounded-lg shadow-xl shadow-slate-400/30 dark:shadow-slate-500/30 border-2 border-slate-300 dark:border-slate-600'>
            <h1 className='text-center lg:text-xl sm:text-lg font-semibold dark:text-cyan-600'>Comments</h1>
            <p className='text-center font-bold text-slate-300 dark:text-slate-500 text-2xl'>{comments?.length} Coments</p>
          </div>
        </div>
        <h2 className='text-2xl font-semibold dark:text-slate-200 text-center mt-8'>My Created Posts</h2>
        <Table heades={TablePosts} data={posts || []} />
      </div>
    </section>
  )
}