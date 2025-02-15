"use client"
import { apis } from "@/services/api";
import { alert } from "@/utils/alert";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()

  const [mails, setMails] = useState<IMailTargetBatch[]>([])
  const [mailSystem, setmailSystem] = useState<IMailSystem[]>([])

  const setup = async () => {
    const getData = await apis.mailTarget.findall()

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

  const setup2 = async () => {
    const getData = await apis.mailSystem.findall()

    if (getData && getData.statusCode === 200) {
      setmailSystem([...getData.data.reverse()])
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
    setup2()
  }, [])

  return (

    <div className="rounded bg-slate-500 p-3 w-full h-full overflow-y-auto">
      <div className="flex justify-between">
        <div className="font-bold">Dashboard</div>
      </div>
      <br />
      <hr />
      <br />
      <div className="flex justify-center mt-20">
        <div className="m-2 p-4 rounded bg-violet-200 text-black w-[200px]">
          <div className="text-[22px] text-center">Mail System</div>
          <div className="text-[30px] font-bold text-center">{mailSystem.length}</div>
        </div>
        <div className="m-2 p-4 rounded bg-gray-200 text-black w-[200px]">
          <div className="text-[22px] text-center">Mail Batch</div>
          <div className="text-[30px] font-bold text-center">{mails.length}</div>
        </div>


      </div>
      <div className="flex justify-center mt-5">
        <div className="m-2 p-4 rounded bg-yellow-200 text-black w-[200px]">
          <div className="text-[22px] text-center">Pending</div>
          <div className="text-[30px] font-bold text-center">{mails.reduce((a, b) => a + b.pending, 0)}</div>
        </div>
        <div className="m-2 p-4 rounded bg-red-200 text-black w-[200px]">
          <div className="text-[22px] text-center">Failed</div>
          <div className="text-[30px] font-bold text-center">{mails.reduce((a, b) => a + b.failed, 0)}</div>
        </div>
        <div className="m-2 p-4 rounded bg-green-200 text-black w-[200px]">
          <div className="text-[22px] text-center">Success</div>
          <div className="text-[30px] font-bold text-center">{mails.reduce((a, b) => a + b.success, 0)}</div>
        </div>

      </div>

    </div>


  );
}
