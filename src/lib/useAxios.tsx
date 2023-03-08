import Axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
export const axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});
// axios.interceptors.request.use(
//     async (value: AxiosRequestConfig) => {
//         if (value.url?.startsWith('/api/')) {
//             await axios.get('/sanctum/csrf-cookie');
//         }
//         return value;
//     }
// );
export async function csrf() { return Axios.get('/sanctum/csrf-cookie',{
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
}); }
