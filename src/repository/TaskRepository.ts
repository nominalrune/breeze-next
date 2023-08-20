import { Task, TaskDTO } from '@/models/Task';
import { useState } from 'react';
import {api} from '@/lib/axios';

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
	private fetchTasks(){
		if(this.loading) return;
		api().get('/tasks').then(response => {
			this.setTasks(response.data.map((task: TaskDTO) => new Task(task)));
		}).finally(()=>this.loading=undefined);
	};
	public async createTask(task: Task): Promise<Task> {
		api().post('/tasks', task.toDTO()).then(response => {
		this.setTasks([...this.tasks, task]);
		})
	}
	public updateTask(task: Task): void {
		this.setTasks(this.tasks.map(t => t.id === task.id ? task : t));
	}
	public deleteTask(id: number): void {
		this.setTasks(this.tasks.filter(task => task.id !== id));
	}
}
