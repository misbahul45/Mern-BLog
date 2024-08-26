import { forwardRef, useState } from 'react';
import Picker from "emoji-picker-react";
import ButtonMessage from './ButtonMessage';

interface Props {
  postId: string
  authorId: string
  replayCommentId: string | null
  setReplayCommentId: React.Dispatch<React.SetStateAction<string | null>>
}

const FormComments = forwardRef<HTMLTextAreaElement, Props>(({ postId, authorId, replayCommentId, setReplayCommentId }, ref) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState<string>('');

  const handleInput = () => {
    const textarea = ref as React.MutableRefObject<HTMLTextAreaElement>;
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  const onEmojiClick = (emojiData: any) => {
    setComment((prev) => prev + emojiData.emoji);
    handleInput();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComment('');
  };

  return (
    <form onSubmit={onSubmit} className='w-full flex items-start gap-2 my-2'>
      <div className="relative w-full">
        <textarea
          ref={ref}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Add a comment'
          className='w-full lg:p-2.5 md:p-2 p-2 border dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-slate-100 rounded outline-none focus:border-slate-800 dark:focus:border-slate-100'
          rows={1}
          onInput={handleInput}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
        <div className='absolute right-2 bottom-2 z-10'>
          <button
            type='button'
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="bg-gray-300 dark:bg-gray-600 p-1 rounded"
          >
            😊
          </button>
        </div>
        {showEmojiPicker && (
          <div className='absolute bottom-12 left-0 z-20 w-full h-64'>
            <Picker onEmojiClick={onEmojiClick} style={{ width: '100%', height: '100%' }} searchDisabled />
          </div>
        )}
      </div>
      <ButtonMessage comment={comment} postId={postId} authorId={authorId} replayCommentId={replayCommentId} setReplayCommentId={setReplayCommentId} />
    </form>
  );
});

export default FormComments;
