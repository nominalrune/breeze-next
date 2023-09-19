import api from '@/lib/axios';
import type {ApiClient} from '@/lib/axios';
import type { TaskDTO, TaskFormInput } from '@/models/Task';
import PhpURL from '@/services/PhpURL';

type ListParam=Partial<{
	page:string;
	pageSize:string;
	state:string;
	keyword:string;
	fields:(keyof TaskDTO)[];
}>

export default class TaskService {
	#api: ApiClient;
	constructor(option:{api: ApiClient} ={api:api()}) {
		this.#api = option.api;
	}

	async list(param?:ListParam) {
		const url = new PhpURL('/tasks',param).toString();
		const res=await this.#api.get(url)
		return await res.json();
	};

	/**
	 *
	 * @throws {AxiosError} error
	 */
	async create(task: TaskFormInput): Promise<unknown> {
		await this.#api.csrf();
		return this.#api.post('/tasks', task).then(
			async (res) => {
				return await res.json();
			}, (res) => {
				throw res;
			});
	};
	async update(task: Partial<TaskDTO>&{id:number|string}) {
		await this.#api.csrf();
		return this.#api.put('/tasks/'+task.id, task).then(
			(res) => {
				return res.json();
			}, (res) => {
				throw res;
			});
	};
	async completeTask(task: Partial<TaskDTO>&{id:number|string}) {
		await this.#api.csrf();
		return this.#api.put('/tasks/'+task.id,{...task, state:3}).then(
			(res) => {
				return res.json();
			}, (res) => {
				throw res;
			});
	}
	async completeSubtask(task: Partial<TaskDTO>&{id:number|string}, subTaskId:number) {
		await this.#api.csrf();
		return this.#api.put('/tasks/'+task.id,{...task, state:3}).then(
			(res) => {
				return res.json();
			}, (res) => {
				throw res;
			});
	}
	async delete(id:number) {
		await this.#api.csrf();
		return this.#api.delete('/tasks/'+id).then(
			(res) => {
				return true;
			}, (res) => {
				throw res;
			});
	};

}


