export interface RepeatedTaskDTO {
	id: number;
	user_id: number,
	title: string,
	description: string,
	parent_task_id: number,
	created_at: string,
	updated_at: string,
	repeat_from: string,
	repeat_until: string,
	startAt: string,
	endAt: string,
	date: string,
	days: string,
	month: string,
	year: string,
	week: string,
}
