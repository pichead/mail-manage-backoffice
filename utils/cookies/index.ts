import Cookies from 'js-cookie'

export const cookiesHandler = {
    get: (name: string) => {
        try {
            const data = Cookies.get(name)
            return data
        } catch (error) {
            console.log(`get cookies error name : ${name}`)
            return null
        }
    },
    set: (name: string, val: string, attr?: { expires: number, secure: boolean } | undefined) => {
        try {
            const data = Cookies.set(name, val, attr)
            return data
        } catch (error) {
            console.log(`set cookies error name : ${name}`)
            return null
        }
    },
    remove: (name: string) => {
        try {
            const data = Cookies.remove(name)
            return data
        } catch (error) {
            console.log(`remove cookies error name : ${name}`)
            return null
        }
    }


}

