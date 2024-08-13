import React from 'react'
import TextEditor from './TextEditor.tsx'

const FormPost = () => {
  const [description, setDescription]=React.useState('')
  return (
    <form className='w-full max-w-4xl mt-4 flex flex-col gap-4 pb-28'>
       <input type="text" className='text-lg font-semibold w-full py-1.5 pl-2 rounded-md dark:text-slate-100 placeholder:text-slate-400 bg-slate-50 dark:bg-slate-600' placeholder='Post Title...' />
       <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select a Category</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
       </select>
       <TextEditor content={description} setContent={setDescription} />
    </form>
  )
}

export default FormPost
