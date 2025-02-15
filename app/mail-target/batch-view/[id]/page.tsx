"use client"
import { apis } from '@/services/api'
import { alert } from '@/utils/alert'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TargetBatchViewPage = ({ params }: { params: { id: string } }) => {


    const [email, setEmail] = useState<IMailTargetBatch | null>(null)

    const setup = async () => {
        const getData = await apis.mailTarget.findone(+params.id)
        if (getData && getData.statusCode === 200) {
            setEmail(getData.data)
        }
        else if (getData) {
            alert.any("error", "Error Get User", getData.messageTh)
        }
        else {
            alert.any("error", "Error Get User", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
        }
    }

    useEffect(() => {
        setup()
    }, [])




    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='w-[80%] mx-auto bg-slate-500 rounded  p-3 mt-[10%]'>
                <div className='flex flex-row'>
                    <div className='font-bold text-[24px]'>Mail Target Batch ID : {params.id}</div>
                </div>
                <br />
                <hr />
                <br />
                {email && (
                    <table className="w-full">
                        <thead className="bg-blue-800 text-white text-center sticky top-0 shadow-md">
                            <tr>
                                <th className="py-2">#</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Header</th>
                                <th className="py-2">Text</th>
                                <th className="py-2">Import batchId</th>
                                <th className="py-2">Retry</th>
                                <th className="py-2">Sender Mail</th>
                                <th className="py-2">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {email.mail_target.map((m, i: number) => (
                                <tr key={"email_" + i} className="text-black bg-slate-300 text-center">
                                    <td className="py-2">{m.id}</td>
                                    <td className="py-2">{m.email}</td>
                                    <td className="py-2">{m.header}</td>
                                    <td className="py-2 w-[200px]"><div className="truncate w-[200px]">{m.text}</div></td>
                                    <td className="py-2">{m.import_batchId}</td>
                                    <td className="py-2">{m.retry}</td>
                                    <th className="py-2">{m.sender}</th>
                                    <td className={`py-2 ${m.status === "SUCCESS" ? " text-green-600 " : (m.status === "FAILED" ? " text-red-600 " : " text-yellow-600 ")}`}>{m.status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}


            </div>
        </div>
    )
}

export default TargetBatchViewPage