"use client"
import { apis } from '@/services/api'
import { alert } from '@/utils/alert'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AdminEditPage = () => {


    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const create = await apis.mailSystem.create(email, password)

        if (create && create.statusCode === 200) {
            alert.any("success", create.messageEn, create.messageTh)
            router.push('/mail-system')
        }
        else if (create) {
            alert.any("error", create.messageEn, create.messageTh)
        }
        else {
            alert.any("error", "Error Create Mail", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
        }
    }

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='w-[30%] mx-auto bg-slate-500 rounded  p-3 mt-[10%]'>
                <div className='flex flex-row'>
                    <div className='font-bold text-[24px]'>Mail System Create</div>
                </div>
                <br />
                <hr />
                <br />
                <form onSubmit={handleSubmit}>
                    <div className=' my-3'>
                        <div >Email </div>
                        <input className='rounded-[12px] text-black px-3 py-1 w-full' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div className='my-3'>
                        <div className=''>Password</div>
                        <input className='rounded-[12px] text-black px-3 py-1 w-full' type='password' onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <div className='flex justify-end'>
                        <button className='btn bg-violet-700 px-4 rounded-[12px] py-1 hover:bg-violet-600' type='submit'>Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AdminEditPage