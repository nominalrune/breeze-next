import { User, type UserDTO } from './User';
import type { Comment, CommentDTO } from './Comment';
import { BaseFormData } from './BaseViewModel';
import BaseModel from './BaseModel';
export class Task implements BaseModel {
	public kind = "App\\Models\\Task" as "App\\Models\\Task";
	constructor(
		public id: number,
		public state: number,
		public title: string,
		public description: string | undefined,
		public parent_task_id: number | undefined,
		public parent_task: Task | undefined,
		public due: Date | undefined,
		public subtasks: Subtask[],
		public owner_id: number | undefined,
		public owner: User | undefined,
		public created_at: Date,
		public updated_at: Date,
		public comments?: CommentDTO<TaskDTO>[],
	) { }
	static fromDTO(task: TaskDTO): Task {
		return new Task(
			task.id,
			task.state,
			task.title,
			task.description,
			task.parent_task_id,
			task.parent_task ? Task.fromDTO(task.parent_task) : undefined,
			task.due ? new Date(task.due) : undefined,
			task.subtasks,
			task.owner_id,
			task.owner ? User.fromDTO(task.owner) : undefined,
			new Date(task.created_at),
			new Date(task.updated_at),
			task.comments ?? [],
		);
	}
	public toFormData(): TaskFormData {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			state: this.state,
			owner_id: this.owner_id,
			parent_task_id: this.parent_task_id,
			due: this.due ? this.due.toISOString() : "",
			subtasks: this.subtasks,
		};
	}
}
export type TaskFormData = BaseFormData<Task, 'parent_task' | 'owner'>;

export interface Subtask {
	state: number,
	title: string,
	subtasks: Subtask[],
}
export interface TaskDTO {
	id: number,
	title: string,
	description?: string,
	state: number,
	owner_id?: number,
	owner?: UserDTO,
	parent_task_id?: number,
	parent_task?: TaskDTO,
	subtasks: Subtask[],
	due?: string,
	created_at: string,
	updated_at: string,
	comments: CommentDTO<TaskDTO>[];
}
