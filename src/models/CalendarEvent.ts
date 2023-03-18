import type { User } from './User';
import type {EventInput} from '@fullcalendar/core';
import type { OmitMany } from './utiltype';

export type CalendarEventInput=EventInput&OmitMany<CalendarEvent,['id',"toEvent"]>&{end:Date,start:Date,toFormData:()=>CalendarEventDTO};

export class CalendarEvent {
	public id?: number;
	public title: string;
	public state:string;
	public start_at: Date;
	public end_at: Date;
	public description: string;
	public user_id: number;
	public user?:User;
	public created_at?: Date;
	public updated_at?: Date;
	constructor(dto: CalendarEventDTO) {
		this.id = dto.id;
		this.state=dto.state;
		this.title = dto.title;
		this.start_at = new Date(dto.start_at);
		this.end_at = new Date(dto.end_at);
		this.description = dto.description??"";
		this.user_id = dto.user_id;
		this.created_at = dto.created_at?new Date(dto.created_at):undefined;
		this.updated_at = dto.updated_at?new Date(dto.updated_at):undefined;
	}
	toEvent():CalendarEventInput{
		return {
			id: this.id?.toString()??"",
			state:this.state,
			title: this.title,
			start: this.start_at,
			start_at: this.start_at,
			end: this.end_at,
			end_at: this.end_at,
			description: this.description,
			user_id: this.user_id,
			user: this.user,
			created_at: this.created_at,
			updated_at: this.updated_at,
			toFormData:this.toFormData
		}
	}
	toFormData():CalendarEventDTO{
		return {
			id: this.id,
			state:this.state,
			title: this.title,
			start_at: this.start_at.toISOString().replace(/\.\d+Z/, ""),
			end_at: this.end_at.toISOString().replace(/\.\d+Z/, ""),
			description: this.description,
			user_id: this.user_id,
			user: this.user,
			created_at: this.created_at?.toISOString(),
			updated_at: this.updated_at?.toISOString()
		}
	}
}
export interface CalendarEventDTO {
	id?: number;
	state:string;
	title: string;
	start_at: string;
	end_at: string;
	description?: string;
	user_id: number;
	user?:User;
	created_at?: string;
	updated_at?: string;
}
