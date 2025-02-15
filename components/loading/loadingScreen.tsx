import React from 'react'
import { TrophySpin } from 'react-loading-indicators'

const LoadingScreen = () => {
    return (
        <div className='grid place-items-center h-screen'>
            <TrophySpin color="#aecce9" size="large" text="" textColor="" />
        </div>
    )
}

export default LoadingScreen