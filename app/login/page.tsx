"use client"
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { alert } from '@/utils/alert';
import useAuthStore from '@/stores/authStore';

const LoginPage = () => {

    const authStore = useAuthStore()

    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }


    const loginClick = async () => {

        const login = await authStore.login(email, password)
        if (login && login.statusCode === 200) {
            router.push('/')
        }
        else {
            if (login) {
                alert.any("error", "login error", login.messageTh)
            }
            else {
                alert.any("error", "login error", "system error! กรุณาติดต่อ admin")
            }
        }

    }

    return (
        <div className='grid place-items-center h-screen'>
            <div className=' bg-slate-200 p-4 w-11/12 md:w-4/12 rounded-[20px]'>
                <div className='text-center text-[30px] text-black'>Login</div>
                <br />

                <TextField
                    required
                    label="Email"
                    type="email"
                    defaultValue=""
                    fullWidth
                    size="small"
                    onChange={emailChange}
                />
                <br />
                <br />

                <TextField
                    required
                    label="Password"
                    defaultValue=""
                    type='password'
                    fullWidth
                    size="small"
                    onChange={passwordChange}
                />
                <br />
                <br />
                <div className='grid place-items-center'>
                    <button className='btn bg-violet-500 px-5 py-2 rounded-lg' onClick={loginClick}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage