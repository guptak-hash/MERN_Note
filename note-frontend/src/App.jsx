import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Navbar/>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
  </Routes>
 <ToastContainer position='top-center'/>
  </>
  )
}

export default App
