import { toast } from 'react-toastify';

const toastPosition = toast.POSITION.BOTTOM_RIGHT;
export const successToast = (message) => {
    toast.success(message, { position: toastPosition });
}

export const errorToast = (message) => {
    toast.error(message, { position: toastPosition });
}