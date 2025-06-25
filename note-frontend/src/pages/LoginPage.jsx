import { useState } from "react"
import PasswordInput from "../components/input/PasswordInput";


const LoginPage = () => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState('');


  return (
    <div className="flex items-center justify-center mt-28">
         <div className="w-96 border rounded bg-white px-7 py-10">
            <form>
                <h4 className='text-2xl mb-7'>Login</h4>
                <input type='text' 
                placeholder='Email' 
                className='input-box' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <PasswordInput/>
            </form>
         </div>
    </div>
  )
}

export default LoginPage