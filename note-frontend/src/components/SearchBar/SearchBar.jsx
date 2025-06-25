import {FaMagnifyingGlass} from 'react-icons/fa6'

const SearchBar = () => {
  return (
    <div className='w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input type="text" 
        placeholder='Search notes ...'
        className='w-full text-xs bg-transparent py-[10px] outline-none'/>
        <FaMagnifyingGlass className='text-slate-500 text-xl cursor-pointer hover:text-black mr-3' />
    </div>
  )
}

export default SearchBar