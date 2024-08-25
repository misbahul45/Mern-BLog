import { createFileRoute, useLocation } from '@tanstack/react-router';
import React from 'react';
import HeaderCategory from '../components/home/HeaderCategory';
import { z } from 'zod';
import Post from '../components/home/Post';
import { sleep } from '../libs/utils';
import Loader from '../components/ui/Loader';
import { useQuery } from 'react-query';
import SearchForm from '../components/home/SearchForm';

const HomeSchema = z.object({
  title: z.string().default('').optional(),
});

export const Route = createFileRoute('/')({
  component: HomePage,
  validateSearch: ({ params }) => HomeSchema.parse(params || {}),
});


function HomePage() {
  const [searchTitle, setSearchTitle] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const patname=useLocation().pathname
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);

  const { data: posts, isLoading } = useQuery<Post[]>(
    ['posts', page, searchTitle, patname],
    async () => {
      const res = await fetch(`/api/posts?page=${page}&title=${searchTitle}`);
      const data = await res.json();
      await sleep();
      return data;
    },
    {
      onSuccess: (newPosts) => {
        setAllPosts((prevPosts) => {
          const postMap = new Map();
          [...prevPosts, ...newPosts].forEach(post => postMap.set(post.id, post));
          return Array.from(postMap.values());
        });
      },
    }
  );

  React.useEffect(() => {
    if (page === 1) {
      setAllPosts(posts || []);
    }
  }, [posts]);

  return (
    <section className='flex flex-col items-center min-h-[calc(100vh-4rem)] lg:px-0 px-2 overflow-hidden bg-cover'>
      <HeaderCategory setAllPosts={setAllPosts} />
      <SearchForm searchItem={searchTitle} setSearchItem={setSearchTitle} />
      <div className='flex flex-col gap-2 w-full max-w-3xl py-4'>
        {allPosts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
        {isLoading && <Loader size='lg' />}
        {!isLoading && allPosts.length === 0 && (
          <h1 className='text-2xl font-bold text-slate-300 dark:text-slate-500'>Posts not found</h1>
        )}
      </div>
      {!isLoading && posts && posts.length>0 && allPosts.length % 5 === 0 && (
        <button onClick={() => setPage(page + 1)} className='border-2 border-slate-200 dark:border-slate-700 dark:text-slate-100 px-4 py-2 rounded-md my-4 hover:bg-slate-200 hover:dark:bg-slate-700 active:bg-red-700'>
          {isLoading ? <Loader size='md' /> : 'Load More'}
        </button>
      )}
    </section>
  );
}
