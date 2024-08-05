import { AiOutlineSearch } from "react-icons/ai"

const SearchForm=()=>{
    return(
        <>
            <form className='relative lg:block hidden'>
                <input type="text" name='search' placeholder='search...' className='w-64 pl-2 pr-6 py-1.5 rounded border-2 border-slate-500' />
                <AiOutlineSearch className='absolute right-2 top-1/2 -translate-y-1/2 opacity-80 text-slate-800' size={18} />
            </form>
            <button className='lg:hidden block p-3 rounded-lg shadow-md shadow-slate-800/50 dark:shadow-slate-200/40 dark:text-slate-100'>
                <AiOutlineSearch />
            </button>
        </>
    )
}

export default SearchForm