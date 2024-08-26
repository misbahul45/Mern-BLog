import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import Post from '../components/home/Post'
import Loader from '../components/ui/Loader'

export const Route = createFileRoute('/user/$id')({
  component:UserPage
})

function UserPage(){
  const id=Route.useParams().id
  const { data: user } = useQuery(['user'], async () => {
    const res = await fetch(`/api/users/${id}`)
    const data = await res.json()
    return data
  })
  const { data:posts, isLoading }=useQuery<Post[]>(['posts'],async()=>{
    const res=await fetch(`/api/posts?authorId=${id}`)
    const data=await res.json()
    return data
  })

  return (
    <section className='w-full min-h-[calc(100vh-4rem)] py-8'>
      <h1 className='lg:text-5xl md:text-4xl text-2xl text-center dark:text-slate-100 font-semibold'>{user?.username}</h1>
      <div className="flex justify-center mt-8">
        <img src={user?.avatar && user.avatar} alt='user avatar' className='lg:size-24 md:size-16 size-12 object-cover rounded-full' />
      </div>
      <div className='flex flex-col gap-2 w-full max-w-2xl py-4 mx-auto'>
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
        {isLoading && <Loader size='lg' />}
        {!isLoading && posts?.length === 0 && <h1 className='text-lg font-bold text-slate-600 dark:text-slate-100'>No posts found</h1>}
      </div>
    </section>
  )
}