import type { UserDTO } from './User';
import type { CommentDTO } from './Comment';
export interface Subtask {
	state: string | number,
	title: string,
	subtasks: Subtask[],
}
export interface TaskDTO {
	kind?: "App\\Models\\Task";
	id: number | string,
	title: string,
	description?: string,
	state: number,
	owner_id?: number | string,
	owner?: UserDTO,
	parent_task_id?: number | string,
	parent_task?: TaskDTO,
	subtasks?: Subtask[],
	due?: string,
	created_at: string,
	updated_at: string,
	comments: CommentDTO<TaskDTO>[];
}
export interface TaskFormInput {
	id?:  string,
	title: string,
	description?: string,
	owner_id?: string,
	parent_task_id?: string,
	subtasks?: Readonly<Subtask[]>,
	due?: string,
	created_at?: string,
	updated_at?: string,
}

// export class Task {
// 	public kind = "App\\Models\\Task" as "App\\Models\\Task";
// 	public id: number|null;
// 	public title: string;
// 	public description?: string;
// 	public state: number;
// 	public parent_task_id: number|null;
// 	public parent_task: Task|null;
// 	public owner_id: number|null;
// 	public owner: UserDTO|null;
// 	public due: Date|null;
// 	public created_at: Date;
// 	public updated_at: Date;
// 	public comments?: CommentDTO<TaskDTO>[];
// 	constructor(task: TaskDTO) {
// 		this.id = +task.id;
// 		this.title = task.title;
// 		this.description = task.description;
// 		this.state = +task.state;
// 		this.owner_id = +(task.owner_id??NaN);
// 		this.owner = task.owner??null;
// 		this.parent_task_id = +(task.parent_task_id??0)??null;
// 		this.parent_task = task.parent_task ? new Task(task.parent_task) : undefined;
// 		this.due = task.due ? new Date(task.due) : undefined;
// 		this.created_at = new Date(task.created_at);
// 		this.updated_at = new Date(task.updated_at);
// 		this.comments = task.comments ?? [];
// 	}
// 	public toDTO(): TaskDTO {
// 		return {
// 			kind: this.kind,
// 			id: this.id,
// 			title: this.title,
// 			description: this.description,
// 			state: this.state,
// 			owner_id: this.owner_id,
// 			owner: this.owner,
// 			parent_task_id: this.parent_task_id,
// 			parent_task: this.parent_task ? this.parent_task.toDTO() : undefined,
// 			due: this.due ? this.due.toISOString() : undefined,
// 			created_at: this.created_at.toISOString(),
// 			updated_at: this.updated_at.toISOString(),
// 			comments: this.comments
// 		};
// 	}
// }
