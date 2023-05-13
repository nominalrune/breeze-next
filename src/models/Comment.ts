import {axios} from '@/lib/axios';
import type { Record, RecordDTO } from './Record';
import type { TaskDTO } from './Task';
import type { User, UserDTO } from './User';


export type Commentable= TaskDTO | RecordDTO;
export interface CommentDTO<T extends Commentable>{
	id: number;
	commentable_type: T['kind'];
	commentable_id: number;
	commentable?:T;
	user_id: number;
	user?:UserDTO;
	body: string;
	created_at: string;
	updated_at: string;
}

export class Comment<T extends Commentable>{
	public type = "App\\Models\\Comment";
	public static create<T extends Commentable>(data:Partial<CommentDTO<T>>){
		return axios.post('/comments', data);
	}
	public static update<T extends Commentable>(data:CommentDTO<T>){
		return axios.put('/comments/'+data.id, data);
	}
	public static delete<T extends Commentable>(data:Partial<CommentDTO<T>>){
		return axios.delete('/comments/'+data.id);
	}

	id: number;
	commentable_type: T['kind'];
	commentable_id: number;
	commentable?:T;
	user_id: number;
	user?:User;
	body: string;
	created_at: Date;
	updated_at: Date;
	public toDTO(): CommentDTO<T> {
		return {
			id: this.id,
			commentable_type: this.commentable_type,
			commentable_id: this.commentable_id,
			user_id: this.user_id,
			body: this.body,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
		};
	}
	constructor(comment:CommentDTO<T>){
		this.id = comment.id;
		this.commentable_type = comment.commentable_type;
		this.commentable_id = comment.commentable_id;
		this.commentable = comment.commentable;
		this.user_id = comment.user_id;
		this.body = comment.body;
		this.created_at = new Date(comment.created_at);
		this.updated_at = new Date(comment.updated_at);
	}
	public static fromDTO<T extends Commentable>(comment:CommentDTO<T>){
		return new Comment(comment);
	}
}
