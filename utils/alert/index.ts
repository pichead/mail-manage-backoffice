import Swal from 'sweetalert2'

type TIcon = 'success' | 'error' | 'warning' | 'info' | 'question';


const any = (icon: TIcon, title: string, text: string) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}


export const alert = {
    any: any
}