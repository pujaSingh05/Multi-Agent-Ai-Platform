import React from 'react'
import { auth, googleProvider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'
import api from '../utils/axios'

function Home() {
    const { user } = useSelector((state) => state.user)

    const handlerlogin = async (token) => {
        try {
            const { data } = await api.post('/api/auth/login', { token })
            console.log(data)
        } catch (error) {
            console.error("Error occurred while logging in:", error)
        }
    }

    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        console.log(token)
        await handlerlogin(token)
        console.log(data)
    }

    return (
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
            <div className='flex flex-col justify-center items-center w-full'>

            </div>
        </div>
    )
}

export default Home