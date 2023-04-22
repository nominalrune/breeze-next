import { axios, abort, csrf } from '@/lib/axios';

import type { TaskDTO } from '@/models/Task';


export default class TaskService {
	static async list() {
		return axios.get('/tasks').then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};

	/**
	 *
	 * @param task
	 * @returns {Promise<TaskDTO>} task
	 * @throws {AxiosError} error
	 */
	static async create(task: Omit<TaskDTO, "id">) {
		await csrf();
		return axios.post<TaskDTO>('/tasks', task).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};
	static async update(task: Partial<TaskDTO>&{id:number}) {
		await csrf();
		return axios.put<TaskDTO>('/tasks/'+task.id, task).then(
			(res) => {
				return res.data;
			}, (res) => {
				throw res;
			});
	};
	static async delete(id:number) {
		await csrf();
		return axios.delete<TaskDTO>('/tasks/'+id, ).then(
			(res) => {
				return true;
			}, (res) => {
				throw res;
			});
	};

}


