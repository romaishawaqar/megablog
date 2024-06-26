import React ,{ useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authService from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ): null
}

export default App
