import { BaseFormData } from './BaseViewModel';

export interface UserDTO{
    id: number,
    name: string,
    email: string,
    email_verified_at?: string,
    created_at: string,
    updated_at: string,
}
export class User{
	public kind = "App\\Models\\User";
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public email_verified_at: Date|undefined,
		public created_at: Date,
		public updated_at: Date,){
	}
	static fromDTO(user:UserDTO):User{
		return new User(
			+user.id,
			user.name,
			user.email,
			user.email_verified_at?new Date(user.email_verified_at):undefined,
			new Date(user.created_at),
			new Date(user.updated_at));
	}
	public toFormData(): UserFormData {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
		};
	}

}

export type UserFormData = BaseFormData<User, 'email_verified_at'>;
