import { useState } from "react"
import PasswordInput from "../components/input/PasswordInput";
import {  Link, useNavigate } from "react-router-dom";
import { validEmail } from "../utils/helper";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validEmail(email)) {
            setError('Please enter a valid email')
            return;
        }
        if (!password) {
            setError('Please enter the password');
            return
        };
        setError('')

        // login api
        try {
            dispatch(signInStart());
            const res = await axios.post('https://mern-note-backend-v5wx.onrender.com/api/login',
                { email, password }, { withCredentials: true,  headers: {
                    'Content-Type': 'application/json'
                } });
                // console.log('res >> ', res.data)
            if (res.data.success === false) {
                // console.log('res >> ', res.data)
                toast.error(res.data.message)
                dispatch(signInFailure(res.data.message));
                return
            };
            toast.success(res.data.message)
            dispatch(signInSuccess(res.data))
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <input type='text'
                        placeholder='Email'
                        className='input-box'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
                    <button type="submit" className="btn-primary">Login</button>
                    <p className="text-sm text-center mt-4">
                        Not registered yet?{" "}
                        <Link to={'/signup'} className="font-medium text-[#2B85FF] underline">
                            Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage