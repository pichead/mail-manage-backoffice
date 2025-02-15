"use client"
import { apis } from '@/services/api'
import { alert } from '@/utils/alert'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TargetCreatePage = () => {

    const router = useRouter()

    const [template, setTemplate] = useState<IMailTemp[]>([]);
    const [name, setName] = useState<string>("");
    const [selectTemplate, setSelectTemplate] = useState<number | null>(null);

    const [email, setEmail] = useState<{
        no: number,
        email: string,
        status: string
    }[]>([]);

    const [onProgress, setOnProgress] = useState<boolean>(false);


    const fileEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const textData = e.target?.result as string;
                const arr = textData.split("\n");
                const dataArr = [];
                for (let i = 0; i < arr.length; i++) {
                    dataArr.push({
                        no: i + 1,
                        email: arr[i],
                        status: "prepare"
                    })
                }
                setEmail([...dataArr]);
                console.log(dataArr)
            };
            reader.readAsText(file[0]);
        }
        else {
            console.log("No file")
        }
    }

    const sendMail = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('send')
        console.log("onProgress : ", onProgress)
        console.log("selectTemplate : ", selectTemplate)

        if (!onProgress && selectTemplate !== null) {
            setOnProgress(true)
            const data = email.map((m) => ({ email: m.email, text: template[selectTemplate].text, header: template[selectTemplate].header }))
            const update = await apis.mailTarget.create(data,name)

            if (update && update.statusCode === 200) {
                alert.any("success", update.messageEn, update.messageTh)
                router.push('/mail-target')
            }
            else if (update) {
                alert.any("error", update.messageEn, update.messageTh)
            }
            else {
                alert.any("error", "Error Create target", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
            }
            setOnProgress(false)
        }
    }

    const setup = async () => {
        const getData = await apis.mailTemplate.findall()

        if (getData && getData.statusCode === 200) {
            setTemplate([...getData.data.reverse()])
        }
        else if (getData) {
            alert.any("error", getData.messageEn, getData.messageTh)
        }
        else {
            alert.any("error", "System Error", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")
        }

    }

    useEffect(() => {
        setup()
    }, [])


    return (
        <form onSubmit={sendMail} className="w-[50%] mx-auto my-[100px]">
            <div className='flex flex-row mb-5'>
                <div className='font-bold text-[24px]'>Add Mail Target</div>
            </div>
            <div className="text-white">Name Batch</div>
            <div>
                <input className='rounded-[12px] text-black px-3 py-1 w-full' type='text' required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <br />
            <div className="text-white">Template</div>
            <div>
                <select className='rounded-[12px] p-1 px-2  text-black w-full' required onChange={(e) => setSelectTemplate(parseInt(e.target.value))}>
                    <option value={""} disabled selected >เลือก Template</option>

                    {template.filter((f) => f.isActive === true).map((m: IMailTemp, i: number) => (
                        <option key={"t_" + i} value={i}>name : {m.name} , header : {m.header}</option>
                    ))}
                </select>
            </div>
            <br />
            <div className="text-white">Email</div>
            <div>
                <input type="file" className="" onChange={fileEmailChange} />
            </div>
            <br />
            <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-md">
                <table className="w-full">
                    <thead className="bg-blue-800 text-white text-center sticky top-0 shadow-md">
                        <tr>
                            <th className="py-2">#</th>
                            <th className="py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {email.map((m, i: number) => (
                            <tr key={"email_" + i} className="text-white bg-blue-400 text-center">
                                <td className="py-2">{m.no}</td>
                                <td className="py-2">{m.email}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="text-end text-white">total : {email.length} Email</div>
            <br />

            <br />
            <div className="flex justify-end">

                <button className="text-white bg-blue-700 px-3 py-2 rounded-[12px] text-[20px] text-bold" type="submit" disabled={onProgress} >{onProgress ? "Creating ... " : "Create"}</button>
            </div>
        </form>
    );
}

export default TargetCreatePage