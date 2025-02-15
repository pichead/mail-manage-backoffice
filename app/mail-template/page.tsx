"use client"
import { apis } from "@/services/api";
import { alert } from "@/utils/alert";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MailSystemPage() {

    const router = useRouter()

    const [mails, setMails] = useState<IMailTemp[]>([])

    const btnCreateClick = () => {
        router.push('/mail-template/create')
    }

    const editBtnClick = (id: number) => {
        router.push('/mail-template/edit/' + id)
    }

    const disableBtnClick = async (id: number) => {
        await apis.mailTemplate.remove(id)
        await setup()
    }

    const activeBtnClick = async (id: number) => {
        await apis.mailTemplate.active(id)
        await setup()
    }

    const setup = async () => {
        const getData = await apis.mailTemplate.findall()

        if (getData && getData.statusCode === 200) {
            setMails([...getData.data.reverse()])
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

        <div className="rounded bg-slate-500 p-3 w-full h-full overflow-y-auto">
            <div className="flex justify-between">
                <div className="font-bold">Mail Template</div>
                <button className="btn bg-violet-700 hover:bg-violet-500 rounded-[12px] px-3" onClick={btnCreateClick}>Create</button>
            </div>
            <br />
            <hr />
            <br />
            <div className="flex justify-center">
                <table className="w-[80%] bg-slate-200 text-black rounded-[12px]">
                    <thead >
                        <tr>
                            <th className="bg-slate-300 rounded-tl-[12px] py-3 text-center border-b">#</th>
                            <th className=" bg-slate-300 py-3 text-center border-b">name</th>
                            <th className=" bg-slate-300 py-3 text-center border-b">header</th>
                            <th className=" bg-slate-300 py-3 text-center border-b">text</th>
                            <th className="bg-slate-300 py-3 text-center border-b">IsActive</th>
                            <th className="bg-slate-300 rounded-tr-[12px] py-3 text-center border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mails.map((mail: IMailTemp, i: number) => (
                            <tr key={"user_" + i}>
                                <td className="py-3 text-center border-t">{i + 1}</td>
                                <td className="py-3 text-center border-t">{mail.name}</td>
                                <td className="py-3 text-center border-t">{mail.header}</td>
                                <td className="py-3 text-center border-t w-[200px]"><div className="truncate w-[200px]">{mail.text}</div></td>
                                <td className="py-3 text-center border-t">{mail.isActive ? "Active" : "Disable"}</td>
                                <td className="py-3 text-center border-t"
                                >
                                    <button className="btn bg-yellow-500 hover:bg-yellow-300 rounded-[12px] px-3 mx-1" onClick={() => editBtnClick(mail.id)}>Edit</button>
                                    {mail.isActive ? (
                                        <button className={`btn bg-red-500 hover:bg-red-30  rounded-[12px] px-3 mx-1`} onClick={() => disableBtnClick(mail.id)}>Disable</button>

                                    ) : (
                                        <button className={`btn bg-green-500 hover:bg-green-30  rounded-[12px] px-3 mx-1`} onClick={() => activeBtnClick(mail.id)}>Active</button>

                                    )}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>


    );
}
