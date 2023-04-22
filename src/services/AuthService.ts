import axios from "@/lib/axios";
import type { UserDTO } from "@/models/User";
import { createContext, } from "react";
import React from 'react';

export class AuthService{
	#user : UserDTO | undefined;
	public get user(){
		return this.#user;
	}
	private set user(user: UserDTO | undefined){
		this.#user = user;
	}
	public constructor(){
		this.prelogin();
	}
	public getUser(): UserDTO | undefined{
		return this.user;
	}
	public async prelogin():Promise<boolean> {
		const res = await axios.get('/login');
		if(res.status>=400){
			this.user = undefined;
			return false;
		}else if(res.status === 200){
			this.user = res.data;
		}
		return true;
	}

	public async login({email, password,remember}:{email: string, password: string,remember: boolean}): Promise<boolean>{
		if (this.user&&this.user.email !== email) {
			await this.logout();
		}
		if(!this.user){
			const res=await axios.post("/login", {email, password});
			if(res.status===200){
				this.user = res.data;
				return true;
			}
		}
		return false;
	}
	public async logout(){
		if(this.user){
			this.user = undefined;
			await axios.post("/logout");
		}
		return true;
	}
}

const auth=new AuthService();
export const AuthContext = React.createContext<AuthService>(auth);
export const UserContext = React.createContext<UserDTO|undefined>(auth.user);
