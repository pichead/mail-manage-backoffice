import Link from 'next/link'
import React from 'react'

const SideBar = () => {
    return (
        <div className='h-screen fixed pb-5 pt-16 pl-3 z-10'>
            <div className='h-full flex flex-col overflow-y-auto p-3 rounded bg-slate-900'>
                <div className='px-3 py-1 '>
                    <Link href="/">Dashboard</Link>
                </div>
                <div className='px-3 py-1'>
                    <Link href="/mail-template">Mail Template</Link>
                </div>
                <div className='px-3 py-1'>
                    <Link href="/mail-target">Mail Target</Link>
                </div>
                <div className='px-3 py-1'>
                    <Link href="/mail-system">Mail System</Link>
                </div>
                <div className='px-3 py-1'>
                    <Link href="/admin">Admin</Link>
                </div>
            </div>
        </div>

    )
}

export default SideBar