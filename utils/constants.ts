
export const constants = {
    appName: {
        en: "CodeX Cheat",
        th: "CodeX Cheat"
    },
    menuProduct: {
        en: "Product",
        th: "รายการสินค้า"
    },
    menuHistory: {
        en: "History",
        th: "ประวัติการใช้งาน"
    },
    menuTopup: {
        en: "Topup",
        th: "เติมเครดิต"
    },
    menuRegister: {
        en: "Register",
        th: "สมัครใช้งาน"
    },
    menuLogin: {
        en: "Login",
        th: "เข้าใช้งาน"
    },
    menuSetting: {
        en: "Settings",
        th: "ตั้งค่า"
    },
    menuProfile: {
        en: "Profile",
        th: "บัญชีผู้ใช้"
    },
    menuContact: {
        en: "Contact",
        th: "ติดต่อทีมงาน"
    },
}

export const menuTH = {
    appName: "CodeX Cheat",
    menuProduct: "รายการสินค้า",
    menuHistory: "ประวัติการใช้งาน",
    menuTopup: "เติมเครดิต",
    menuRegister: "สมัครใช้งาน",
    menuLogin: "เข้าใช้งาน",
    menuSetting: "ตั้งค่า",
    menuProfile: "บัญชีผู้ใช้",
    menuContact: "ติดต่อทีมงาน",
    menuSupport: "ช่วยเหลือ",
}

export const menuEN = {
    appName: "CodeX Cheat",
    menuProduct: "Products",
    menuHistory: "History",
    menuTopup: "Topup",
    menuRegister: "Register",
    menuLogin: "Login",
    menuSetting: "Setting",
    menuProfile: "Profile",
    menuContact: "Contact",
    menuSupport: "Support",
}


export const ENV = {
    appName: process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "Website",
    port: process.env.NEXT_PUBLIC_PORT ? process.env.NEXT_PUBLIC_PORT : 3000,
    backend: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ? process.env.NEXT_PUBLIC_BACKEND_ENDPOINT : "http://localhost:3333",
    accessTokenName: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME : "acct",
    refreshTokenName: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME ? process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME : "reft",
}