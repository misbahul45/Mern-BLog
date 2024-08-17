import { FaAngleDoubleUp, FaCommentAlt } from "react-icons/fa";
import { useQuery } from 'react-query';
import { sleep } from '../../libs/utils';
import Loader from '../ui/Loader';

interface Props {
    id: string;
    goToComments: () => void;
}

const User = ({id,goToComments}:Props) => {
    const { data: user, isLoading } = useQuery<User>(
        ['user', id],
        async () => {
          const res = await fetch(`/api/users/${id}`);
          const data = await res.json();
          await sleep();
          return data;
        },
      );

      if(!user?.id && !isLoading){
        return(
            <div className="my-6 flex items-center dark:text-slate-100 font-semibold w-full justify-between">    
                <div className="flex items-center gap-4">
                    <div className='size-16 rounded-full object-cover bg-slate-600 animate-pulse'/>
                    <div>
                        <h1 className="lg:text-md text-sm font-bold text-slate-600 dark:text-slate-100">User not found</h1>
                        <h2 className="lg:text-sm text-xs text-slate-500 dark:text-slate-300">Email not found</h2>
                    </div>
                </div>
                {!isLoading && (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <button className='p-2 rounded-full text-purple-600 hover:bg-purple-800 hover:text-slate-100 border-2 border-purple-600 transition-all duration-100'>
                                <FaAngleDoubleUp size={20} />
                            </button>
                            <span className="text-sm dark:text-slate-100">Upprove</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={goToComments} className='p-2 rounded-full text-green-600 hover:bg-green-800 hover:text-slate-100 border-2 border-green-600 transition-all duration-100'>
                                <FaCommentAlt size={20} />
                            </button>
                            <span className="text-sm dark:text-slate-100">Coments</span>
                        </div>
                    </div>
                )}
            </div>
        )
      }
  return (
    <div className='my-6 flex items-center dark:text-slate-100 font-semibold w-full justify-between'>
      {isLoading?
        <Loader size='lg' />
        :
        <div className="flex items-center lg:gap-4 gap-2">
            <img src={user?.avatar} alt={user?.username} loading="lazy" className='lg:size-16 md:size-10 size-10 rounded-full object-cover' />
            <div>
                <h1 className="lg:text-md text-sm font-bold text-slate-600 dark:text-slate-100">{user?.username}</h1>
                <h2 className="lg:text-sm text-xs text-slate-500 dark:text-slate-300">{user?.email}</h2>
            </div>
        </div>
    }
    {!isLoading && (
        <div className="flex items-center lg:gap-4 gap-2">
            <div className="flex flex-col items-center gap-1">
                <button className='p-2 rounded-full text-purple-600 hover:bg-purple-800 hover:text-slate-100 border-2 border-purple-600 transition-all duration-100'>
                    <FaAngleDoubleUp className="lg:text-2xl text-md" />
                </button>
                <span className="lg:text-sm text-xs dark:text-slate-100">Upprove</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <button onClick={goToComments} className='p-2 rounded-full text-green-600 hover:bg-green-800 hover:text-slate-100 border-2 border-green-600 transition-all duration-100'>
                    <FaCommentAlt className="lg:text-2xl text-md" />
                </button>
                <span className="lg:text-sm text-xs dark:text-slate-100">Comments</span>
            </div>
        </div>
    )}
    </div>
  )
}

export default User
