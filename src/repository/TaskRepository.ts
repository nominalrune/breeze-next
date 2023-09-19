import { Task, TaskDTO } from '@/models/Task';
import { useState } from 'react';
import api from '@/lib/axios';

export default class TaskRepository {
	private static instance: TaskRepository
	private tasks: Task[];
	private setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	private loading: Promise<any>|undefined;
	constructor() {
		const [tasks, setTasks] = useState<Task[]>([]);
		this.tasks = tasks;
		this.setTasks = setTasks;
		this.fetchTasks();
	}
	public static getInstance(): TaskRepository {
		if (!TaskRepository.instance) {
			TaskRepository.instance = new TaskRepository();
		}
		return TaskRepository.instance;
	}

	public list() {
		return this.tasks;
	}
	public get(id: number): Task|undefined {
		return this.tasks.find(task => task.id === id);
	}
	private async fetchTasks(){
		if(this.loading) return;
		api().get('/tasks').then(async(response) => {
			this.setTasks((await response.json()).map((task: TaskDTO) => Task.fromDTO(task)));
		}).finally(()=>this.loading=undefined);
	};
	public async createTask(task: Task): Promise<Task> {
		const resp = await api().post('/tasks', task.toFormData());
		const _task=Task.fromDTO(await resp.json());
		this.setTasks([...this.tasks, _task]);
		return _task;
	}
	public updateTask(task: Task): void {
		this.setTasks(this.tasks.map(t => t.id === task.id ? task : t));
	}
	public deleteTask(id: number): void {
		this.setTasks(this.tasks.filter(task => task.id !== id));
	}
}
