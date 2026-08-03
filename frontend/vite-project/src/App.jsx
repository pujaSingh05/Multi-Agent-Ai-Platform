import React from 'react'
import { auth, googleProvider } from '../utils/firebase'
import { getCurrentUser } from '../features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserdata } from '../features/userSlice'
import { useEffect } from 'react'
import Home from './Home'

import api from '../utils/axios'

function App() {


  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser()
      dispatch(setUserdata(data))
    }
    getUser()
  }, [])

  return (
    <>
      <Home />
    </>
  )
}

export default App

