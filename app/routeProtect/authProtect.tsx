"use client"
import LoadingScreen from '@/components/loading/loadingScreen'
import useAuthStore from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import React, { ReactNode, Suspense, useEffect, useState } from 'react'

interface AuthProtectProps {
    children: ReactNode;
}

const AuthProtect: React.FC<AuthProtectProps> = ({ children }) => {
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
            console.log("authStore.isAuthenticated : ",authStore.isAuthenticated)
            console.log("user : ",user)

            setIsAuth(user);
        };

        checkAuth();
    }, [])

    useEffect(() => {
        if (isAuth !== null) {
            console.log("isAuth : ",isAuth)
            if (isAuth === false) {
                router.push('/login')
            }
        }
    }, [isAuth])

    return (
        <React.Fragment>
            <Suspense fallback={<LoadingScreen />}>
                {isAuth ? children : null}
            </Suspense>
        </React.Fragment >
    )
}

export default AuthProtect