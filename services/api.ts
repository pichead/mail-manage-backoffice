import { ENV } from '@/utils/constants';
import { cookiesHandler } from '@/utils/cookies';
import axios from 'axios';

const backend = ENV.backend
const accessTokenName = ENV.accessTokenName
const refreshTokenName = ENV.refreshTokenName


const apiAuth = axios.create({
    baseURL: backend,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiAuth.interceptors.request.use(request => {
    const accessToken = cookiesHandler.get(accessTokenName)
    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

const apiPublic = axios.create({
    baseURL: backend,
    headers: {
        'Content-Type': 'application/json',
    },
});

const login = async (email: string, password: string): Promise<IResponse | null> => {
    try {

        let payload = JSON.stringify({
            "email": email,
            "password": password
        });

        const call = await apiPublic.post('/api/v1/auth/admin-login', payload);
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const createUser = async (email: string, password: string, name: string) => {
    try {

        let payload = JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        });

        const call = await apiAuth.post('/api/v1/user/register', payload);
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const validate = async () => {
    try {
        const call = await apiAuth.get("/api/v1/auth/validate-admin")
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}


const adminFindAll = async (): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/user/admin-findall")
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const adminFindOne = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/user/admin-findone/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const adminEdit = async (id: number, data: IAdminEdit): Promise<IResponse | null> => {
    try {


        let payload = JSON.stringify({
            "email": data.email,
            "password": data.password ? data.password : undefined,
            "name": data.name
        });

        const call = await apiAuth.patch("/api/v1/user/admin-update/" + id, payload)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}


const mailSystemCreate = async (email: string, password: string) => {
    try {

        let payload = JSON.stringify({
            "email": email,
            "password": password,
        });

        const call = await apiAuth.post('/api/v1/mail-system/create', payload);
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailSystemFindAll = async (): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/mail-system/findall")
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailSystemFindOne = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/mail-system/findone/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailSystemEdit = async (id: number, data: IMailSystemEdit): Promise<IResponse | null> => {
    try {


        let payload = JSON.stringify({
            "email": data.email,
            "password": data.password,
        });

        const call = await apiAuth.patch("/api/v1/mail-system/update/" + id, payload)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailSystemRemove = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.delete("/api/v1/mail-system/remove/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailSystemActive = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.patch("/api/v1/mail-system/active/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTemplateCreate = async (name: string, header: string, text: string) => {
    try {

        let payload = JSON.stringify({
            "name": name,
            "header": header,
            "text": text,

        });

        const call = await apiAuth.post('/api/v1/mail-template/create', payload);
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTemplateFindAll = async (): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/mail-template/findall")
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTemplateFindOne = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/mail-template/findone/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTemplateEdit = async (id: number, data: { name: string, header: string, text: string }): Promise<IResponse | null> => {
    try {


        let payload = JSON.stringify({
            "name": data.name,
            "header": data.header,
            "text": data.text,
        });

        const call = await apiAuth.patch("/api/v1/mail-template/update/" + id, payload)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTemplateRemove = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.delete("/api/v1/mail-template/remove/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTemplateActive = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.patch("/api/v1/mail-template/active/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTargetCreate = async (mail: { email: string, text: string, header: string }[], name: string) => {
    try {

        let payload = JSON.stringify({
            "mail": mail,
            "name": name
        });

        const call = await apiAuth.post('/api/v1/mail-target/create', payload);
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTargetFindAll = async (): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/mail-target/batch/")
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTargetFindOne = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/mail-target/mail/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTargetUpdateSuccess = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.patch("/api/v1/mail-target/update-success-batch/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const mailTargetUpdatePending = async (id: number): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.patch("/api/v1/mail-target/update-pending-batch/" + id)
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}


export const apis = {
    auth: {
        login: login,
        validate: validate
    },
    admin: {
        create: createUser,
        findall: adminFindAll,
        findone: adminFindOne,
        edit: adminEdit
    },
    mailSystem: {
        create: mailSystemCreate,
        findall: mailSystemFindAll,
        findone: mailSystemFindOne,
        edit: mailSystemEdit,
        remove: mailSystemRemove,
        active: mailSystemActive
    },
    mailTemplate: {
        create: mailTemplateCreate,
        findall: mailTemplateFindAll,
        findone: mailTemplateFindOne,
        edit: mailTemplateEdit,
        remove: mailTemplateRemove,
        active: mailTemplateActive
    },
    mailTarget: {
        create: mailTargetCreate,
        findall: mailTargetFindAll,
        findone: mailTargetFindOne,
        updateBatchSuccess: mailTargetUpdateSuccess,
        updateBatchPending: mailTargetUpdatePending,

    }
}