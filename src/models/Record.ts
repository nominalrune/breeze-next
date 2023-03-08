import type { Task } from './Task';
import type { User } from './User';

export interface Record {
	title: string;
	description?: string;
	related_task_id?: number;
	related_task?: Task;
	material_id?:number;
	material?:Material;
	start_at?: string;
	end_at?: string;
	user_id: number;
	user?: User;
}
