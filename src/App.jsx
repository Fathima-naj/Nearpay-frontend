
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import Dashboard from './pages/Dashboard'
// import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
    <>
    {/* <Toaster position='top-center'/> */}
    <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
