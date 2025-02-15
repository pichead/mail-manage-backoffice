"use client"
import { apis } from "@/services/api";
import { alert } from "@/utils/alert";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminPage() {

    const router = useRouter()

    const [users, setUsers] = useState<IUser[]>([])

    const btnCreateClick = () => {
        router.push('/admin/create')
    }

    const editBtnClick = (id: number) => {
        router.push('/admin/edit/' + id)
    }

    const setup = async () => {
        const getData = await apis.admin.findall()

        if (getData && getData.statusCode === 200) {
            setUsers([...getData.data.reverse()])
        }
        else {
            if (getData) {
                alert.any("error", getData.messageEn, getData.messageTh)
            }
            else {
                alert.any("error", "System Error", "เกิดข้อผิดพลาด กรุณาติดต่อ admin")

            }
        }

    }

    useEffect(() => {
        setup()
    }, [])

    return (
        <React.Fragment>

            <div className="rounded bg-slate-500 p-3 w-full h-full overflow-y-auto">
                <div className="flex justify-between">
                    <div className="font-bold">ADMIN</div>
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
                                <th className=" bg-slate-300 py-3 text-center border-b">Name</th>
                                <th className=" bg-slate-300 py-3 text-center border-b">Email</th>
                                <th className="bg-slate-300 py-3 text-center border-b">IsActive</th>
                                <th className="bg-slate-300 rounded-tr-[12px] py-3 text-center border-b"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: IUser, i: number) => (
                                <tr key={"user_" + i}>
                                    <td className="py-3 text-center border-t">{i + 1}</td>
                                    <td className="py-3 text-center border-t">{user.name}</td>
                                    <td className="py-3 text-center border-t">{user.email}</td>
                                    <td className="py-3 text-center border-t">{user.isActive ? "Active" : "Disable"}</td>
                                    <td className="py-3 text-center border-t">
                                        <button className="btn bg-yellow-500 hover:bg-yellow-300 rounded-[12px] px-3" onClick={() => editBtnClick(user.id)}>Edit</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>


        </React.Fragment>
    );
}
