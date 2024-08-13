import { createFileRoute } from '@tanstack/react-router'
import { FaBookReader } from "react-icons/fa";
import FormImage from '../components/story/FormImage';
import FormPost from '../components/story/FormPost';

export const Route = createFileRoute('/new-story')({
  component:storyPage
})


function storyPage(){
  return(
    <section className='w-full h-full min-h-[calc(100vh-4rem)] flex items-center justify-center flex-col gap-4 dark:text-slate-50 lg:px-0 px-4'>
      <div className='flex gap-2 items-center justify-center my-2'> 
        <p className='text-2xl dark:text-slate-100 font-bold'>Create a Story</p>
        <FaBookReader size={25} className='text-orange-500' />
      </div>
      <FormImage />
      <FormPost />
    </section>
  )
}