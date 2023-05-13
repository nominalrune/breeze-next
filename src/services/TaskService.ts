import { axios, abort, csrf } from '@/lib/axios';

import type { TaskDTO, TaskFormInput } from '@/models/Task';
import type { AxiosInstance, AxiosResponse } from 'axios';


export default class TaskService {

	#axios: AxiosInstance;
	#abort: ()=>void;
	#csrf:()=>Promise<AxiosResponse>;
	constructor(option:{axios: AxiosInstance,abort:()=>void, csrf:()=>Promise<AxiosResponse>} = { axios:axios,abort, csrf}) {
		this.#axios = option.axios;
		this.#abort=option.abort;
		this.#csrf=option.csrf;
	}
	public abort(){
		this.#abort();
	}

	async list() {
		return this.#axios.get('/tasks').then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};

	/**
	 *
	 * @throws {AxiosError} error
	 */
	async create(task: TaskFormInput): Promise<TaskDTO> {
		await this.#csrf();
		return this.#axios.post<TaskDTO>('/tasks', task).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};
	async update(task: Partial<TaskDTO>&{id:number}) {
		await this.#csrf();
		return this.#axios.put<TaskDTO>('/tasks/'+task.id, task).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};
	async completeTask(task: Partial<TaskDTO>&{id:number}) {
		await this.#csrf();
		return this.#axios.put<TaskDTO>('/tasks/'+task.id,{...task, state:3}).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	}
	async completeSubtask(task: Partial<TaskDTO>&{id:number}, subTaskId:number) {
		await this.#csrf();
		return this.#axios.put<TaskDTO>('/tasks/'+task.id,{...task, state:3}).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	}
	async delete(id:number) {
		await this.#csrf();
		return this.#axios.delete<TaskDTO>('/tasks/'+id).then(
			(res) => {
				return true;
			}, (res) => {
				throw res;
			});
	};

}


