import { useNavigate } from "@tanstack/react-router"
import { MdSearch } from "react-icons/md"

interface Props {
    searchItem:string
    setSearchItem:React.Dispatch<React.SetStateAction<string>>
}
const SearchForm = ({ searchItem, setSearchItem }:Props) => {
    const navigate=useNavigate()
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchItem(e.target.value)
        if(searchItem.length>0){
            navigate({
                to:'/',
                search: {
                    title: e.target.value.toLowerCase().replace(' ', '-'),
                }
            })
        }
    }
  return (
    <div className="w-full max-w-xl relative flex items-center gap-2 mt-4">
      <input type="text" placeholder="Search By Title..." value={searchItem} onChange={onChange} className="outline-none w-full py-1.5 pl-8 dark:text-slate-100 placeholder:text-slate-400 bg-transparent border-b-2 border-b-slate-400 focus:border-b-slate-800 dark:border-b-slate-700 focus:dark:border-b-slate-300 peer" />  
      <MdSearch className="text-slate-400 dark:text-slate-700 peer-focus:text-slate-600 peer-focus:dark:text-slate-300 absolute left-0 top-1/2 -translate-y-1/2" size={25} />
    </div>
  )
}

export default SearchForm
