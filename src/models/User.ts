export interface UserDTO{
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
}
export class User{
	public class = "App\\Models\\User";
	id: number;
	name: string;
	email: string;
	email_verified_at: Date;
	created_at: Date;
	updated_at: Date;
	constructor(user:UserDTO){
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.email_verified_at = new Date(user.email_verified_at);
		this.created_at = new Date(user.created_at);
		this.updated_at = new Date(user.updated_at);
	}

}

export interface AuthParam{
    user:UserDTO
}
