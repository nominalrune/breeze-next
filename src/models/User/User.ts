import { BaseFormData } from '../BaseViewModel';

export class User {
	public kind = "App\\Models\\User";
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public email_verified_at: Date | undefined,
		public created_at: Date,
		public updated_at: Date,) {
	}
	static fromDTO(_user: UserDTO): User {
		const user = UserDTOSchema.parse(_user);
		return new User(
			user.id,
			user.name,
			user.email,
			user.email_verified_at ? new Date(user.email_verified_at) : undefined,
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
