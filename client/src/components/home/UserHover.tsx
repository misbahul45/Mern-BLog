import { useQuery } from 'react-query';
import { sleep } from '../../libs/utils';
import { Link } from '@tanstack/react-router';

interface Props {
    id: string;
}

const UserHover = ({ id }: Props) => {
  const { data: user, isLoading } = useQuery<User>(
    ['userHover', id],
    async () => {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      await sleep();
      return data;
    },
  );

  return (
    <Link className='peer-hover:flex items-center gap-2 hidden absolute top-12 left px-3 py-2.5 z-50 bg-white/50 dark:bg-slate-700/50 rounded shadow-xl shadow-slate-900/50 backdrop-blur-lg transition-all duration-100'>
        {isLoading ? (
        <>
            <div className='size-8 bg-slate-400 dark:bg-slate-600 animate-pulse rounded-full'></div>
            <div className='w-56'>
                <div className='w-full h-2 rounded bg-slate-400 dark:bg-slate-600 animate-pulse'></div>
                <div className='w-full h-2 rounded bg-slate-400 dark:bg-slate-600 animate-pulse mt-1.5'></div>
            </div>
        </>
        ) : (
        <>
            <img src={user?.avatar} alt={user?.username} className='size-8 rounded-full object-cover' />
            <div>
                <h1 className='text-sm font-bold text-slate-600 dark:text-slate-100'>{user?.username}</h1>
                <h2 className='text-xs text-slate-500 dark:text-slate-300'>{user?.email}</h2>
            </div>
        </>
        )}
  </Link>
  )
}

export default UserHover
