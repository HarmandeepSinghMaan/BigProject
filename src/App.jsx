import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import React from 'react'
import { login, logout } from './store/authSlice'
import authService from './appwrite/auth.js'
import { Header, Footer } from './components'


function App() {
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {if(userData)
    {
      dispatch(login({userData: userData}))
    }
    else
    {
      dispatch(logout())
    }})
    .finally(() => {
      setLoader(false)
    })
},[])



  return !loader ? (<>
    <div className='bg-slate-100 flex h-screen items-center justify-center'>
      <div className='w-full block'>
      <Header />
    <h1 className='text-4xl font-bold bg-slate-200 text-slate-800'>Hello Harman</h1>
      <Footer/>
    </div>
    </div>
    </>)
    :null
    
  
}

export default App;
