import { useNavigate } from '@tanstack/react-router'
import React from 'react'

const category=['All', 'Study', 'Programing', 'Life Style', 'Informations']

interface Props{
    search:string,
    searchItem:string,
    setSearchItem:React.Dispatch<React.SetStateAction<string>>
}

const HeaderCategory = ({ search, searchItem, setSearchItem }:Props) => {
    const navigate=useNavigate()
    const gosearch=(searchItem:string)=>{
        searchItem=searchItem.toLowerCase().replace(' ', '-')
        navigate({
            to:'/',
            search: {
              search: searchItem,
            }
        })
        setSearchItem(searchItem)
    }
  return (
    <div className='px-4 py-0.5 flex gap-2 w-full max-w-xl'>
      {category.map((item, index)=><button key={index} onClick={()=>gosearch(item)} className={`${searchItem===item.toLowerCase().replace(' ', '-') && 'border-b-4 border-slate-500 dark:border-slate-700'} rounded-full flex-1 text-center text-slate-400 font-semibold hover:text-slate-800 dark:hover:text-white`}>{item}</button>)}
    </div>
  )
}

export default HeaderCategory
