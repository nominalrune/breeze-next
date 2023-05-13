import { axios, abort, csrf } from '@/lib/axios';

import type { TaskDTO } from '@/models/Task';


export default class TaskService {

	private abortController: AbortController;
	constructor() {
		this.abortController = new AbortController();
	}
	public abort(){
		this.abortController.abort();
		this.abortController = new AbortController();
	}

	async list() {
		return axios.get('/tasks').then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};

	/**
	 *
	 * @returns {Promise<TaskDTO>} task
	 * @throws {AxiosError} error
	 */
	async create(task: Omit<TaskDTO, "id">) {
		await csrf();
		const controller = this.abortController;
		return axios.post<TaskDTO>('/tasks', task, { signal: controller.signal }).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};
	async update(task: Partial<TaskDTO>&{id:number}) {
		await csrf();
		const controller = this.abortController;
		return axios.put<TaskDTO>('/tasks/'+task.id, task, { signal: controller.signal }).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};
	async completeTask(task: Partial<TaskDTO>&{id:number}) {
		await csrf();
		const controller = this.abortController;
		return axios.put<TaskDTO>('/tasks/'+task.id,{...task, state:3}, { signal: controller.signal }).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	}
	async completeSubtask(task: Partial<TaskDTO>&{id:number}, subTaskId:number) {
		await csrf();
		const controller = this.abortController;
		return axios.put<TaskDTO>('/tasks/'+task.id,{...task, state:3}, { signal: controller.signal }).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	}
	async delete(id:number) {
		await csrf();
		const controller = this.abortController;
		return axios.delete<TaskDTO>('/tasks/'+id,  { signal: controller.signal }).then(
			(res) => {
				return true;
			}, (res) => {
				throw res;
			});
	};

}


