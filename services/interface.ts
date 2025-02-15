

interface IResponse {
    statusCode: number,
    messageEn: string,
    messageTh: string,
    data?: any
}

interface IStoreCreate {
    file: File;
    card: File;
    detail: File;
    name: string;
    short_name: string;
    day_h: string;
    day_1: string;
    day_3: string;
    day_7: string;
    day_15: string;
    day_30: string;
    day_p: string;
    status: 'กำลังพัฒนา' | 'ปิดปรับปรุง' | 'พร้อมใช้งาน';
    description: string;
    game_src: string;
    youtube_link: string;
}


interface IStoreEdit {
    file?: File;
    card?: File;
    detail?: File;
    name: string;
    short_name: string;
    day_h: string;
    day_1: string;
    day_3: string;
    day_7: string;
    day_15: string;
    day_30: string;
    day_p: string;
    status: 'กำลังพัฒนา' | 'ปิดปรับปรุง' | 'พร้อมใช้งาน';
    description: string;
    game_src: string;
    youtube_link: string;
}

interface IStore {
    createdAt: string;
    day_1: number;
    day_3: number;
    day_7: number;
    day_15: number;
    day_30: number;
    day_h: number;
    day_p: number;
    detail: string;
    download_src: string;
    game_src: string;
    hack_img_scr: string;
    id: number;
    img_src: string;
    isActive: boolean;
    name: string;
    short_name: string;
    status: 'กำลังพัฒนา' | 'ปิดปรับปรุง' | 'พร้อมใช้งาน';
    updatedAt: string;
    visible: number;
    youtube_link: string;
}

interface IRentLog {
    id: number;
    userId: number;
    gameId: number;
    exp_date: number;
    last_update?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    game: IStore;
    users: {
        id: number;
        name: string;
        email: string;
        hwid: string | null
    },

}

interface IAdminEdit {
    name: string,
    email: string,
    password?: string | null | undefined
}

interface IMailSystemEdit {
    email: string,
    password: string
}

interface IUser {
    id: number
    name: string
    email: string
    isActive: boolean
    credit: number
    hwid: string | null
}

interface IMailSystem {
    id: number
    email: string
    password: string
    type: string
    isActive: boolean
    workCount: number
    lastActive: number
    createdAt: Date
    updatedAt: Date
}


interface IMailTargetBatch {
    id: number
    name: string
    status: string
    createdAt: Date
    updatedAt: Date
    mail_target: {
        id: number,
        email: string,
        header: string,
        text: string,
        status: string,
        import_batchId:number,
        mailSnapshot: any,
        sender: string,
        history: any,
        retry: string,
        createdAt: Date,
        updatedAt: Date
    }[],
    pending: number,
    failed: number,
    success: number,
}


interface IMailTemp {
    id: number
    name: string
    header: string
    text: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

interface IRedeemLog {
    id: number;
    userId: number;
    users: {
        id: number;
        name: string;
        email: string;
        credit: number
    }
    redeem_amount: number;
    time?: number;
    link?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}