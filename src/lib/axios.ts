// import Axios from 'axios';
fetch('https://jsonplaceholder.typicode.com/todos/1',{})
// import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
export type ApiClient = {
	csrf: () => Promise<Response>;
	get: (url: string) => Promise<Response>;
	post: (url: string, data?: any) => Promise<Response>;
	put: (url: string, data?: any) => Promise<Response>;
	delete: (url: string) => Promise<Response>;
};
const backend = process.env.BACKEND_URL?.endsWith('/') ? process.env.BACKEND_URL.slice(0, -1) : process.env.BACKEND_URL ?? "";
export default function api(config?: RequestInit): ApiClient {
	const api = (method: string, url: string, body?: string | object, abort?: AbortController) => {
		return fetch(backend + url, {
			method,
			mode: 'cors',
			credentials: 'include',
			signal: abort?.signal,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: body instanceof Object ? JSON.stringify(body) : body,
		});
	};
	// const api = (method: string, url: string, body?: string | object, controller?: AbortController) => Axios.create({
	// 		baseURL: process.env.BACKEND_URL,
	// 		withCredentials: true,
	// 		signal: controller?.signal,
	// 		headers: {
	// 			'X-Requested-With': 'XMLHttpRequest',
	// 			// 'Access-Control-Allow-Origin': '*',
	// 		},
	// 		responseType: 'json',
	// 		...config,
	// 	})
	const get = async (url: string) => {
		const abort = new AbortController();
		const resp = await api('GET', url,undefined, abort);
		return resp;
	};
	const post = (url: string, body: string | ArrayBuffer) => api('POST', url, body);
	const put = (url: string, body: string | ArrayBuffer) => api('PUT', url, body);
	const _delete = (url: string) => api('DELETE', url);
	// const axios = Axios.create({
	// 	baseURL: process.env.BACKEND_URL,
	// 	withCredentials: true,
	// 	signal: controller.signal,
	// 	headers: {
	// 		'X-Requested-With': 'XMLHttpRequest',
	// 		'Access-Control-Allow-Origin': '*',
	// 	},
	// 	responseType: 'json',
	// 	...config,
	// }) as ApiClient;
	async function _csrf() {
		return get('/sanctum/csrf-cookie');
	}
	// 	api.csrf = _csrf;
	// 	api.abort = _abort;
	// 	return api;
	return { get, post, put, delete: _delete, csrf: _csrf };
}


