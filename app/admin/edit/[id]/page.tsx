"use client"
import { apis } from '@/services/api'
import { alert } from '@/utils/alert'
import React, { useEffect, useState } from 'react'

const AdminEditPage = ({ params }: { params: { id: string } }) => {



    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const setup = async () => {
        const getData = await apis.admin.findone(+params.id)
        if (getData && getData.statusCode === 200) {
            setName(getData.data.name)
            setEmail(getData.data.email)
        }
        else {
            if (getData) {
                alert.any("error", "Error Get User", getData.messageTh)
            }
            else {
                alert.any("error", "Error Get User", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
            }
        }
    }

    useEffect(() => {
        setup()
    }, [])


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            email,
            name,
            ...{ password: password ? password : undefined }
        }

        const update = await apis.admin.edit(+params.id, data)

        if (update && update.statusCode === 200) {
            alert.any("success", update.messageEn, update.messageTh)

        }
        else {
            if (update) {
                alert.any("error", "Error Update User", update.messageTh)
            }
            else {
                alert.any("error", "Error Update User", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
            }
        }
    }

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='w-[30%] mx-auto bg-slate-500 rounded  p-3 mt-[10%]'>
                <div className='flex flex-row'>
                    <div className='font-bold text-[24px]'>Admin Edit ID : {params.id}</div>
                </div>
                <br />
                <hr />
                <br />
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <div>Name</div>
                        <input className='rounded-[12px] text-black px-3 py-1 w-full' required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
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