import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Navbar = () => {
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black'>
            <span className='text-slate-500'>Good</span>
            <span className='text-slate-900'>Notes</span>
        </h2>
        <SearchBar/>
        <ProfileInfo/>
    </div>
  )
}

export default Navbar