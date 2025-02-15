import { useRouter } from 'next/navigation'
import React from 'react'


interface IProductProp {
    name: string
    status: string
    id: number
    image: string
}

const ProductCardCom = (props: IProductProp) => {

    const router = useRouter()

    const editBtnClick = () => {
        router.push("store/edit/" + props.id)
    }

    return (
        <React.Fragment>
            <div className='border-white bg-white  w-[140px] rounded-[12px] text-black hover:border-violet-600 border-[3px]'>
                <div className='p-1 rounded relative h-[145px]'>
                    <div className='absolute top-2 right-2'>
                        <div className={`${props.status === 'ปิดปรับปรุง' ? 'bg-red-700' : props.status === 'พร้อมใช้งาน' ? "bg-green-600" : "bg-red-700"} w-fit text-[12px] px-1 rounded text-white `}>{props.status}</div>
                    </div>
                    <img className='rounded object-cover w-full h-[145px]' src={props.image} ></img>

                </div>
                <div className='px-1'>
                    <p className='my-1 text-center font-bold truncate  overflow-hidden'>
                        {props.name}
                    </p>
                    <div className='flex justify-center my-1'>
                        <button className='btn bg-yellow-300 px-4 rounded-[12px] text-[12px]' type='button' onClick={editBtnClick}>Edit</button>
                    </div>
                </div>

            </div>
        </React.Fragment >
    )
}

export default ProductCardCom