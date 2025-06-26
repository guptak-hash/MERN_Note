import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate();
    function handleSearch(e) {
        e.preventDefault()
    }

    function onClearSearch(e) {
        e.preventDefault()
        setSearchQuery('')
    }

    const onLogout = () => {
        navigate('/login')
    }
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <Link to={'/'}> <h2 className='text-xl font-medium text-black'>
                <span className='text-slate-500'>Good</span>
                <span className='text-slate-900'>Notes</span>
            </h2></Link>
           
            <SearchBar value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch} />
            <ProfileInfo onLogout={onLogout} />
        </div>
    )
}

export default Navbar