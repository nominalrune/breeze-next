import { cs } from '@fullcalendar/core/internal-common';
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

export function api(config?: AxiosRequestConfig) {
	const controller = new AbortController();
	const axios = Axios.create({
		baseURL: process.env.BACKEND_URL ,
		withCredentials: true,
		signal,
		...config
	});
	function _abort() {
		controller.abort();
	}
	async function _csrf() {
		return Axios.get('/sanctum/csrf-cookie', {
			baseURL: process.env.BACKEND_URL,
		});
	}
	const _api = {
		get(url: string, config?: AxiosRequestConfig) {
			return axios.get(url, config);
		},
		post(url: string, data?: any, config?: AxiosRequestConfig) {
			return axios.post(url, data, config);
		},
		put(url: string, data?: any, config?: AxiosRequestConfig) {
			return axios.put(url, data, config);
		},
		delete(url: string, config?: AxiosRequestConfig) {
			return axios.delete(url, config);
		},
		abort(){
			_abort();
		},
		csrf(){
			return _csrf();
		}
	}
	return _api;
}
