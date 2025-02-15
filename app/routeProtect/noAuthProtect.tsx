"use client"
import LoadingScreen from '@/components/loading/loadingScreen'
import useAuthStore from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import React, { ReactNode, Suspense, useEffect, useState } from 'react'

interface AuthProtectProps {
    children: ReactNode;
}

const NoAuthProtect: React.FC<AuthProtectProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null)
    const router = useRouter()
    const authStore = useAuthStore()

    const getUser = async () => {
        const data = await authStore.getUser()
        return data
    }

    useEffect(() => {
        const checkAuth = async () => {
            const user = await getUser();
            setIsAuth(user);
        };

        checkAuth();
    }, [])

    useEffect(() => {
        if (isAuth === true) {
            router.push('/')
        }
        console.log('check : ', isAuth)
    }, [isAuth])

    return (
        <React.Fragment>
            <Suspense fallback={<LoadingScreen />}>
                {isAuth ? null : children}
            </Suspense>
        </React.Fragment>
    )
}

export default NoAuthProtect