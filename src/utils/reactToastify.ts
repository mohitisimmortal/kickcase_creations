import { toast } from 'react-toastify';

export const handleApiError = (error: any) => {
    let errorMessage = 'Something went wrong';
    if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    } else if (error.message) {
        errorMessage = error.message;
    }
    toast.error(errorMessage);
};

export const showSuccessNotification = (message:any) => {
    toast.success(message);
};