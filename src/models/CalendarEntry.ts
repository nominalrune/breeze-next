import type { TaskDTO } from './Task';


export interface CalendarEntry {
	id: string;
	allDay: boolean;
	title: string;
	start: string;
	end: string | null;
	extendedProps: {
		title: string;
		entry_type: 'App\\Models\\CalendarEvent';
		entry_id: number;
		user_id: number;
		description: string;
		created_at: string;
		updated_at: string;
		status: string | null;
		start_at: string;
		end_at: string;
	} | {
		title: string,
		entry_type: 'App\\Models\\Task',
		entry_id: number,
		user_id: number | null,
		description: string,
		created_at: string,
		updated_at: string,
		due: string,
		task_type: number | null,
		status: number,
		parent_task_id: number | null,
		parentTask?: TaskDTO,
	} | {
		title: string,
		entry_type: 'App\\Models\\Record',
		entry_id: number,
		user_id: number | null,
		description: string,
		created_at: string,
		updated_at: string,
		date: string,
		time: string,
		task_id: number | null,
		task?: TaskDTO,
	};
}
