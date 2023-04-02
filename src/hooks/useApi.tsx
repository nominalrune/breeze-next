import Axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
export const api = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

export async function csrf() { return Axios.get('/sanctum/csrf-cookie',{
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
}); }
