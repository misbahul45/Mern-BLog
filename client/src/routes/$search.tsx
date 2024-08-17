import { createFileRoute } from '@tanstack/react-router'
import HeaderCategory from '../components/home/HeaderCategory'
import SearchForm from '../components/home/SearchForm'
import Post from '../components/home/Post'
import React from 'react'
import { useQuery } from 'react-query'
import { sleep } from '../libs/utils'
import Loader from '../components/ui/Loader'

export const Route = createFileRoute('/$search')({
  component:SearchPage,
})

function SearchPage() {
  const [searchTitle, setSearchTitle] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const categorySearch=Route.useParams().search
  const { data: posts, isLoading } = useQuery<Post[]>(
    ['posts', page, searchTitle],
    async () => {
      const res = await fetch(`/api/posts?search=${categorySearch.replace('-', ' ')}&page=${page}&title=${searchTitle}`);
      const data = await res.json();
      await sleep();
      return data;
    },
    {
      keepPreviousData: true,
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
    <section className='flex flex-col items-center min-h-[calc(100vh-4rem)] lg:px-0 px-2 overflow-hidden'>
      <HeaderCategory setAllPosts={setAllPosts} />
      <SearchForm searchItem={searchTitle} setSearchItem={setSearchTitle} />
      <div className='flex flex-col gap-2 w-full max-w-2xl py-4'>
        {allPosts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
        {isLoading && <Loader size='lg' />}
        {!isLoading && allPosts.length === 0 && (
          <h1 className='text-lg font-bold text-slate-600 dark:text-slate-100'>No posts found</h1>
        )}
      </div>
      {!isLoading && posts && allPosts.length % 5 === 0 && allPosts.length > 0 && (
        <button onClick={() => setPage(page + 1)} className='bg-blue-700 text-slate-100 px-4 py-2 rounded-md my-4 hover:bg-blue-800 active:bg-red-700'>
          {isLoading ? <Loader size='md' /> : 'Load More......'}
        </button>
      )}
    </section>
  );
}

