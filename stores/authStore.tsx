import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cookiesHandler } from '@/utils/cookies';
import { apis } from '@/services/api';
import { ENV } from '@/utils/constants';

const accessTokenName = ENV.accessTokenName

interface AuthStore {
    user: any;
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<IResponse | null>;
    logout: () => boolean;
    getUser: () => Promise<boolean | null>;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: async (email: string, password: string) => {
                console.log("get login store")

                try {
                    const response = await apis.auth.login(email, password)
                    console.log("response1 : ",response)
                    if (response?.statusCode === 200) {
                        const token = response.data.token
                        const setCookie = cookiesHandler.set(accessTokenName, token)
                        if (setCookie) {
                            set({
                                user: null,
                                isAuthenticated: true,
                            });
                            return response

                        }
                        else {
                            return response
                        }
                    }
                    else {
                        return response
                    }

                } catch (error) {
                    console.error('Login failed:', error);
                    set({ user: null, isAuthenticated: false });
                    return null
                }
            },
            logout: () => {
                console.log("get logout store")
                try {
                    cookiesHandler.remove(accessTokenName)
                    set({ user: null, isAuthenticated: false });
                    return true
                } catch (error) {
                    console.error('logout failed:', error);
                    return false
                }

            },
            getUser: async () => {
                try {
                    const response = await apis.auth.validate()
                    console.log(response)
                    if (response?.statusCode === 200) {
                        set({
                            user: {
                                ...response.data
                            },
                            isAuthenticated: true,
                        });
                        return true
                    }
                    else {
                        return false
                    }
                } catch (error) {
                    set({ user: null, isAuthenticated: false });
                    return false
                }
            }
        }),
        {
            name: "authState"
        }
    ));

export default useAuthStore;