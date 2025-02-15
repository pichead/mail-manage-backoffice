"use client"

import useAuthStore from '@/stores/authStore'
import { alert } from '@/utils/alert'

import Link from 'next/link'
import React from 'react'

function Navbar() {
    const authStore = useAuthStore()
    const AppName = "Mail Sender Management"

    const logoutClick = async () => {
        const logoutStore = authStore.logout()
        if (logoutStore) {
            location.reload()
        }
        else {
            alert.any("error", "Logout Error", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
        }
    }

    return (
        <React.Fragment>
            <div className={'p-3 fixed bg-slate-900 my-auto flex justify-between w-full z-10'} >
                <div className={`flex`}>
                    <Link href="/">
                        <div className='mx-3 hover:cursor-pointer h-1'>{AppName}</div>
                    </Link>
                </div>
                <div>
                    <button className='btn border hover:cursor-pointer border-slate-500 px-3 rounded bg-slate-500 hover:bg-slate-400' onClick={logoutClick}>Logout</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar