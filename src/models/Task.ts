import type { User } from './User';

export interface TaskDTO {
	id?: number,
	title: string,
	description?: string,
	status: number,
	owner_id?: number,
	owner?: User,
	parent_task_id?: number,
	parent_task?: TaskDTO,
	due?: string,
	created_at: string,
	updated_at: string,
}

export class Task {
	public id?: number;
	public title: string;
	public description?: string;
	public status: number;
	public parent_task_id?: number;
	public parent_task?: Task;
	public owner_id?: number;
	public owner?: User;
	public due?: Date;
	public created_at: Date;
	public updated_at: Date;
	constructor(task: TaskDTO) {
		this.id = task.id;
		this.title = task.title;
		this.description = task.description;
		this.status = task.status;
		this.owner_id = task.owner_id;
		this.owner = task.owner;
		this.parent_task_id = task.parent_task_id;
		this.parent_task = task.parent_task ? new Task(task.parent_task) : undefined;
		this.due = task.due ? new Date(task.due) : undefined;
		this.created_at = new Date(task.created_at);
		this.updated_at = new Date(task.updated_at);
	}
	public toDTO(): TaskDTO {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			status: this.status,
			owner_id: this.owner_id,
			owner: this.owner,
			parent_task_id: this.parent_task_id,
			parent_task: this.parent_task ? this.parent_task.toDTO() : undefined,
			due: this.due ? this.due.toISOString() : undefined,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
		};
	}
}
