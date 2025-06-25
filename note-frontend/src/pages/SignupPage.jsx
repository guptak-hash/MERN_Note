import { useState } from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/input/PasswordInput';
import { validEmail } from '../utils/helper';

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault()
        if(!name){
            setError('Please enter name');
            return;
        }
         if (!validEmail(email)) {
                    setError('Please enter a valid email')
                    return;
                }
                if (!password) {
                    setError('Please enter the password');
                    return
                };
                setError('')
        // signup api
    }
    return (
        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form onSubmit={handleSignup}>
                    <h4 className='text-2xl mb-7'>Signup</h4>
                    <input type='text'
                        placeholder='Name'
                        className='input-box'
                        value={email}
                        onChange={(e) => setName(e.target.value)} />
                    <input type='text'
                        placeholder='Email'
                        className='input-box'
                        value={name}
                        onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
                    <button type="submit" className="btn-primary">Signup</button>
                    <p className="text-sm text-center mt-4">
                        Already have an account ?{" "}
                        <Link to={'/login'} className="font-medium text-[#2B85FF] underline">
                            Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignupPage