import React from 'react';
import TextEditor from './TextEditor.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import Loader from '../ui/Loader.tsx';
import { useMutation } from 'react-query';
import { queryClient } from '../../App.tsx';
import { sleep } from '../../libs/utils.ts';

interface Props {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  descriptionStory?: string;
  titleStory?: string;
  categoryStory?: string;
  postId?: string;
}

interface Error {
  message: string;
  success: boolean;
}

const FormPost = ({ avatar, setAvatar, titleStory, descriptionStory , categoryStory, postId }: Props) => {
  const [description, setDescription] = React.useState<string>(descriptionStory || '');
  const [category, setCategory] = React.useState<string>(categoryStory || '');
  const [title, setTitle] = React.useState<string>(titleStory || '');

  const { currentUser } = useSelector((state: RootState) => state.user);

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  
  const mutation = useMutation(
    async () => {
      if(!title && !description && !category && !avatar){
        setError({ message: 'All fields are required', success: false });
        return Promise.reject(new Error('All fields are required'));
      }
      if(!categoryStory && !titleStory && !descriptionStory){
        const res = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorId: currentUser.id,
            title,
            category,
            desc: description,
            image: avatar,
          }),
        });
        const data = await res.json();
        await sleep();
        return data;
      }
      //update
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId: currentUser.id,
          title,
          category,
          desc: description,
          image: avatar,
        }),
      });
      const data = await res.json();
      await sleep();
      return data;
    },
    {
      onSuccess: (data) => {
        setError({ message: data.message, success: data.success });
        setAvatar('');
        setDescription('');
        setTitle('');
        setCategory('');
        queryClient.invalidateQueries(['posts']);
       ;
      },
      onError: (_) => {
        setError({ message: 'Failed to create post', success: false });
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mt-4 flex flex-col gap-4">
      {error && (
        <div
          className={`w-full py-2 text-center text-lg ${
            error.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-900'
          }`}
        >
          <p>{error.message }</p>
        </div>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="capitalize text-lg font-semibold w-full py-1.5 pl-2 rounded-md dark:text-slate-100 placeholder:text-slate-400 bg-slate-50 dark:bg-slate-600"
        placeholder="Post Title..."
      />
      <select
        id="categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select a Category</option>
        <option value="Study">Study</option>
        <option value="Programing">Programing</option>
        <option value="Life Style">Life Style</option>
        <option value="Information">Information</option>
      </select>
      <TextEditor content={description} setContent={setDescription} />
      <button
        type="submit"
        className="w-full py-2 border-2 border-slate-300 nmb-6 md:mt-11 sm:mt-16 mt-24 hover:bg-slate-300 flex justify-center items-center dark:border-slate-700 dark:hover:bg-slate-700 rounded"
      >
        {loading ? <>
          <Loader size="md" />
          <p className="ml-2">{categoryStory?"Updating...":"Uploading..."}</p>
        </> : (categoryStory ? 'Update Post Story':'Upload Post Story')}
      </button>
    </form>
  );
};

export default FormPost;
