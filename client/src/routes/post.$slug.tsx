import { createFileRoute } from '@tanstack/react-router'
import parse from "html-react-parser";
import User from '../components/post/User';
import Comment from '../components/post/Comment';
import React, { useEffect } from 'react';

export const Route = createFileRoute('/post/$slug')({
  component:PostPage,
  loader: async ({ params }) => {
    const { slug } = params
    const post = await fetch(`/api/posts/${slug}`).then(res => res.json())
    
    return post as Post
  }
})


function PostPage() {
  const post:Post=Route.useLoaderData()
  const commentRef=React.useRef<null | HTMLDivElement>(null)
  const goToComments=()=>{
    window.scrollTo({top:commentRef.current?.offsetTop,behavior:'smooth'})
  }

  useEffect(() => {
    window.scrollTo({top:0,behavior:'smooth'})
  },[])
  return (
    <section className='min-h-[calc(100vh-4rem)] w-full max-w-4xl block mx-auto py-4 px-2.5'>
      <h1 className='lg:text-5xl md:text-3xl text-2xl font-semibold dark:text-slate-100 text-center'>{post?.title}</h1>
      <User postId={post?.id} goToComments={goToComments} id={post?.authorId} />
      <img loading='lazy' src={post?.image} alt={post?.slug} className='w-full' />
      <div className='my-4 dark:text-slate-200'>
        {parse(post?.desc)}
      </div>
      <Comment ref={commentRef} />
    </section>
  )
}