import { useLocation } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

const category=['All', 'Study', 'Programing', 'Life Style', 'Information']

interface Props{
  setAllPosts:React.Dispatch<React.SetStateAction<Post[]>>
}

const HeaderCategory = ({setAllPosts}:Props) => {
    const pathName=useLocation().pathname
    const navigate=useNavigate()
    
    const gosearch=(searchItem:string)=>{
        searchItem=searchItem.toLowerCase().replace(' ', '-')
        if(searchItem==='all'){
          navigate({
            to:'/',
          })
        }else{
          navigate({
            to:`/$search`,
            params:{
                search:searchItem
            }
          })
        } 
        setAllPosts([])
    }
  return (
    <div className='py-0.5 flex gap-1 w-full max-w-xl justify-center'>
      {category.map((item, index)=><button key={index} onClick={()=>gosearch(item)} className={`${pathName.split('/')[1].replace('-',' ')===item.toLowerCase() && 'border-b-4 border-slate-500 dark:border-slate-700'}  text-nowrap rounded-full text-center text-slate-400 font-semibold lg:text-xl text-sm px-2 pb-1 hover:text-slate-800 dark:hover:text-white`}>{item}</button>)}
    </div>
  )
}

export default HeaderCategory
