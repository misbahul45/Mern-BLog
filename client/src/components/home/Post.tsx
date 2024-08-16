import React from 'react'
import User from './User'
import { Link } from '@tanstack/react-router'
interface Props extends Post{}



const Post = ({ title, desc, category, authorId, slug, image, updatedAt }:Props) => {
  return (
    <Link to='/projects' className='w-full py-1 px-2 rounded-lg'>
      <User id={authorId} updatedAt={updatedAt} />
      <div className='flex mt-1'>
        <div className='flex-1 flex flex-col gap-2'>
          <div>
            <h1 className='font-semibold text-slate-700 dark:text-orange-500 lg:text-xl'>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: desc }} className='dark:text-slate-100 line-clamp-3 lg:text-md text-sm' />
          </div>
          <span className='text-slate-400 w-24 text-center font-semibold dark:text-slate-300 text-xs px-2 py-2 bg-slate-200 dark:bg-slate-700 rounded'>{category}</span>
        </div>
        <img src={image} alt={slug} className='h-28 w-40 rounded-md object-cover' loading='lazy' />
      </div>
    </Link>
  )
}

export default Post

