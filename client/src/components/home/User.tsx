import { sleep } from '../../libs/utils';
import Loader from '../ui/Loader';
import moment from 'moment';
import { useQuery } from 'react-query';
import UserHover from './UserHover';
import React from 'react';
import { Link } from '@tanstack/react-router';

interface Props {
  id: string;
  updatedAt: string;
}

const User = ({ id, updatedAt }: Props) => {
  const [hovered, setHovered] = React.useState(false);
  const { data: user, isLoading } = useQuery<User>(
    ['user', id],
    async () => {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      return data;
    },
  );


  if(!user?.id && !isLoading){
    return(
      <div className='flex gap-2'>
        <div className='size-8 rounded-full object-cover bg-slate-600' />
        <h1 className='lg:text-md text-sm font-bold text-slate-600 dark:text-slate-100'>User not found</h1>
      </div>
    )
  }

  return (
    <>
      <Link to='/user/$id'
        params={{ id }}
        className='flex items-center justify-between gap-2 w-full peer'
      >
        {isLoading ? (
          <Loader size='md' />
        ) : (
          <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className='flex gap-2'>
            <img src={user?.avatar || 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722988800&semt=ais_hybrid'} alt={user?.username} className='size-8 rounded-full object-cover' />
            <h1 className='lg:text-md text-sm font-bold text-slate-600 dark:text-slate-100'>{user?.username}</h1>
          </div>
        )}
        <span className='text-xs text-slate-500 dark:text-slate-600'>
          {moment(updatedAt).fromNow()}
        </span>
      </Link>
      {hovered && <UserHover id={id} />}
    </>
  );
};

export default User;
