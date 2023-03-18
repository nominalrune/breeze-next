import type { User } from './User';

export class CalendarEvent {
	public id?: number;
	public title: string;
	public start_at: Date;
	public end_at: Date;
	public description: string;
	public user_id: number;
	public user?:User;
	public created_at?: Date;
	public updated_at?: Date;
	constructor(dto: CalendarEventDTO) {
		this.id = dto.id;
		this.title = dto.title;
		this.start_at = new Date(dto.start_at);
		this.end_at = new Date(dto.end_at);
		this.description = dto.description??"";
		this.user_id = dto.user_id;
		this.created_at = dto.created_at?new Date(dto.created_at):undefined;
		this.updated_at = dto.updated_at?new Date(dto.updated_at):undefined;
	}
}
export interface CalendarEventDTO {
	id?: number;
	title: string;
	start_at: string;
	end_at: string;
	description?: string;
	user_id: number;
	user?:User;
	created_at?: string;
	updated_at?: string;
}
