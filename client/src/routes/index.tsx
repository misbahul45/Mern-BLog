import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import HeaderCategory from '../components/home/HeaderCategory'
import { z } from 'zod'
import Post from '../components/home/Post'
import { sleep } from '../libs/utils'
import Loader from '../components/ui/Loader'
import { useQuery } from 'react-query'

const HomeSchema = z.object({
  search:z.string().default('all'),
})

export const Route = createFileRoute('/')({
  component:HomePage,
  validateSearch:({ params })=>HomeSchema.parse(params || {}),
})

function HomePage(){
  const { search }=Route.useSearch()
  const [searchItem, setSearchItem]=React.useState<string>(search || 'all')

  const { data:posts, isLoading }=useQuery<Post[]>('posts', async()=>{
    const res = await fetch('/api/posts')
    const data = await res.json()
    await sleep()
    return data
  })

  React.useEffect(()=>{

  },[searchItem])

  return(
    <section className='flex flex-col items-center min-h-[calc(100vh-4rem)]'>
        <HeaderCategory searchItem={searchItem} setSearchItem={setSearchItem} search={search || 'all'} />
        <div className='flex flex-col gap-2 w-full max-w-2xl py-4'>
          {posts?.map((post)=>(
            <Post key={post.id} {...post} />
          ))}
          {isLoading && <Loader size='lg' />}
          {!isLoading && posts?.length === 0 && <h1 className='text-lg font-bold text-slate-600 dark:text-slate-100'>No posts found</h1>}
        </div>
    </section>
  )
}