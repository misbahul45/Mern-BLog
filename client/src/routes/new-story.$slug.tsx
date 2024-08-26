import { createFileRoute } from '@tanstack/react-router';
import { FaBookReader } from "react-icons/fa";
import FormImage from '../components/story/FormImage';
import FormPost from '../components/story/FormPost';
import React from 'react';


export const Route = createFileRoute('/new-story/$slug')({
  component: storyPage,
  loader: async ({ params }) => {
    const { slug } = params || {};
    try {
      const post = await fetch(`/api/posts/${slug}`).then(res => res.json());
      return post as Post;
    } catch (error) {
      console.error("Failed to fetch post", error);
      return null;
    }
  },
});

function storyPage() {
  const post=Route.useLoaderData<Post>()
  const [imgUrl, setImgUrl] = React.useState(post?.image || '');

  return (
    <section className='w-full h-full min-h-[calc(100vh-4rem)] flex items-center justify-center flex-col gap-4 dark:text-slate-50 lg:px-0 px-4'>
      <div className='flex gap-2 items-center justify-center my-2'> 
        <p className='text-2xl dark:text-slate-100 font-bold'>Create a Story</p>
        <FaBookReader size={25} className='text-orange-500' />
      </div>
      <FormImage imgUrl={imgUrl} setImgUrl={setImgUrl} />
      <FormPost 
        avatar={imgUrl} 
        setAvatar={setImgUrl} 
        titleStory={post?.title || ''} 
        descriptionStory={post?.desc || ''} 
        categoryStory={post?.category || ''} 
        postId={post?.id}
      />
    </section>
  );
}