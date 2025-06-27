import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutStart, signOutFailure, signOutSuccess} from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSearch(e) {
        e.preventDefault()
        
    }

    function onClearSearch(e) {
        e.preventDefault()
        setSearchQuery('')
    }
// console.log('navbar currentUser >> ',currentUser)
    const onLogout = async () => {
        try {
            dispatch(signOutStart())
            const res = await axios.post('https://mern-note-backend-v5wx.onrender.com/api/logout',{},
                { withCredentials: true }
            );
            // console.log('res_signout >> ', res.data)
            if (res.data.success == false) {
                dispatch(signOutFailure(res.data.message))
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message)
            dispatch(signOutSuccess())
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            dispatch(signOutFailure(error.message))
        }
    }
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <Link to={'/'}> <h2 className='text-xl font-medium text-black'>
                <span className='text-slate-500'>Good</span>
                <span className='text-slate-900'>Notes</span>
            </h2></Link>

            {currentUser && (
                <>
                <SearchBar value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch} />
            <ProfileInfo onLogout={onLogout} />
            </>)}
        </div>
    )
}

export default Navbar