import type { TaskDTO } from './Task';
import type { UserDTO } from './User';
import type { Topic } from './Topic';
import type { CommentDTO } from './Comment';

export interface RecordDTO {
	kind: "App\\Models\\Record";
	id: number;
	title: string;
	description?: string;
	related_task_id?: number;
	related_task?: TaskDTO;
	topic_id?:number;
	topic?:Topic;
	date: string;
	time: number;
	user_id: number;
	user?: UserDTO;
	comments?:CommentDTO<RecordDTO>[];
	created_at: string;
	updated_at: string;
}

export class Record {
	public kind = "App\\Models\\Record" as "App\\Models\\Record";
	public id: number;
	public title: string;
	public description?: string;
	public related_task_id?: number;
	public related_task?: TaskDTO;
	public topic_id?:number;
	public topic?:Topic;
	public date: Date;
	public time: number;
	public user_id: number;
	public user?: UserDTO;
	public comments?:CommentDTO<RecordDTO>[];
	public created_at: Date;
	public updated_at: Date;
	constructor(record: RecordDTO) {
		this.id = record.id;
		this.title = record.title;
		this.description = record.description;
		this.related_task_id = record.related_task_id;
		this.related_task = record.related_task;
		this.topic_id = record.topic_id;
		this.topic = record.topic;
		this.date = new Date(record.date);
		this.time = record.time;
		this.user_id = record.user_id;
		this.user = record.user;
		this.comments = record.comments??[];
		this.created_at = new Date(record.created_at);
		this.updated_at = new Date(record.updated_at);
	}
	public static fromDTO(record:RecordDTO){
		return new Record(record);
	}
	public toDTO(): RecordDTO {
		return {
			kind : "App\\Models\\Record",
			id: this.id,
			title: this.title,
			description: this.description,
			related_task_id: this.related_task_id,
			related_task: this.related_task,
			topic_id: this.topic_id,
			topic: this.topic,
			date: this.date.toISOString(),
			time: this.time,
			user_id: this.user_id,
			user: this.user,
			comments: this.comments,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
		};
	}
}
