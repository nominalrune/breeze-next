import Axios from 'axios';

import type { AxiosRequestConfig } from 'axios';

const controller = new AbortController();
const { signal } = controller;
export const axios = Axios.create({
	baseURL: process.env.BACKEND_URL ,
	withCredentials: true,
	signal,
});
export function abort() {
	// controller.abort();
}

export async function csrf() {
	return Axios.get('/sanctum/csrf-cookie', {
		baseURL: process.env.BACKEND_URL,
	});
}

