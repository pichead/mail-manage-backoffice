"use client"
import { apis } from '@/services/api'
import { alert } from '@/utils/alert'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const MailTempCreatePage = () => {


    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [header, setHeader] = useState<string>("")
    const [text, setText] = useState<string>("")



    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const create = await apis.mailTemplate.create(name, header, text)

        if (create && create.statusCode === 200) {
            alert.any("success", create.messageEn, create.messageTh)
            router.push('/mail-template')
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
                    <div className='font-bold text-[24px]'>Mail Template Create</div>
                </div>
                <br />
                <hr />
                <br />
                <form onSubmit={handleSubmit}>
                    <div className=' my-3'>
                        <div >Name </div>
                        <input className='rounded-[12px] text-black px-3 py-1 w-full' type='text' required value={name} onChange={(e) => setName(e.target.value)} />

                    </div>
                    <div className='my-3'>
                        <div className=''>Header</div>
                        <input className='rounded-[12px] text-black px-3 py-1 w-full' type='text' required value={header} onChange={(e) => setHeader(e.target.value)} />
                    </div>
                    <div className='my-3'>
                        <div className=''>Text</div>
                        <textarea className='rounded-[12px] text-black px-3 py-1 w-full' required value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <div className='flex justify-end'>
                        <button className='btn bg-violet-700 px-4 rounded-[12px] py-1 hover:bg-violet-600' type='submit'>Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default MailTempCreatePage