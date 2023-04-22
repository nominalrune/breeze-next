import type { UserDTO } from './User';
import type { CommentDTO } from './Comment';
export interface Subtask{
	state:string,
	title:string,
	subtasks?:Subtask[],
}
export interface TaskDTO {
	kind?: "App\\Models\\Task";
	id?: number|string,
	title: string,
	description?: string,
	status: string,
	owner_id?: number|string,
	owner?: UserDTO,
	parent_task_id?: number|string,
	parentTask?: TaskDTO,
	subtasks?:Subtask[],
	due?: string,
	created_at?: string,
	updated_at?: string,
	comments?: CommentDTO<TaskDTO>[];
}

export class Task {
	public kind = "App\\Models\\Task" as "App\\Models\\Task";
	public id?: number;
	public title: string;
	public description?: string;
	public status: number;
	public parent_task_id?: number;
	public parentTask?: TaskDTO;
	public owner_id?: number;
	public owner?: UserDTO;
	public due?: Date;
	public created_at: Date;
	public updated_at: Date;
	public comments?: CommentDTO<TaskDTO>[];
	constructor(task: TaskDTO) {
		this.id = +task.id;
		this.title = task.title;
		this.description = task.description;
		this.status = +task.status;
		this.owner_id = +task.owner_id;
		this.owner = task.owner;
		this.parent_task_id = +task.parent_task_id;
		this.parentTask = task.parentTask ? new TaskDTO(task.parentTask) : undefined;
		this.due = task.due ? new Date(task.due) : undefined;
		this.created_at = new Date(task.created_at);
		this.updated_at = new Date(task.updated_at);
		this.comments = task.comments ?? [];
	}
	public toDTO(): TaskDTO {
		return {
			kind: this.kind,
			id: this.id,
			title: this.title,
			description: this.description,
			status: this.status,
			owner_id: this.owner_id,
			owner: this.owner,
			parent_task_id: this.parent_task_id,
			parentTask: this.parentTask ? this.parentTask.toDTO() : undefined,
			due: this.due ? this.due.toISOString() : undefined,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
			comments: this.comments
		};
	}
}
