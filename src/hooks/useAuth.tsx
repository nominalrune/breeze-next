import { axios, csrf } from '@/lib/axios';
import { useState, useContext, createContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import type { UserDTO } from '@/models/User';


export const useAuth = () => {
	const [user, setUser] = useState<UserDTO>();
	const navigate = useNavigate();
	const controller = new AbortController();
	const signal = controller.signal;
	function abort() {
		controller.abort();
	}

	interface RegisterInputs {
		name: string;
		email: string;
		password: string;
		password_confirmation: string;
	}
	interface LoginInputs {
		email: string;
		password: string;
		remember: boolean;
	}
	async function prelogin() {
		try {
			await csrf();
			const res = await axios.get('/login', {signal});
			console.log("already logged in", res);
			setUser(res.data.user);
			return true;
		}
		catch (e) {
			console.log("not logged in", e);
			return false;
		}
	}
	async function login(inputs: LoginInputs, navigateIfAuthenticated: string = "/") {

		if(await prelogin()){
			navigate(navigateIfAuthenticated);
		}
			await csrf();
			console.log("login fetch started");
			try {
				const res = await axios.post('/login', inputs, {signal});
				console.log("login fetch finished", res);
				setUser(()=>res.data.user);
				console.log({user})
				navigate(navigateIfAuthenticated);
			} catch (error) {
				console.error({ error });
				// if (error.response.status === 422){setErrors()}
				// setErrors(error.response.data.errors);
			}
	};
	const register = async (inputs: RegisterInputs, navigateIfAuthenticated: string = "/") => { //FIXME
		await csrf();
		axios
			.post('/register', inputs, {signal})
			.then(res => {
				setUser(res.data);
				navigate(navigateIfAuthenticated);
			})
			.catch(error => {
				// if (error.response.status === 422){ return {error:"The email is already taken"};}
				return { error };
			});
	};

	const forgotPassword = async (email: string) => { //FIXME
		await csrf();

		axios
			.post('/forgot-password', { email }, {signal})
			.catch(error => {
				// if (error.response.status !== 422) throw new Error(error);
				throw new Error(error);
			});
	};

	const resetPassword = async (props: any) => { //FIXME
		const { token } = useParams();
		await csrf();
		axios
			.post('/reset-password', { token, ...props }, {signal})
			.then(response =>
				navigate('/login?reset=' + btoa(response.data.status)),
			)
			.catch(error => {
				if (error.response.status !== 422) throw new Error(error);
			});
	};

	const resendEmailVerification = () => {
		axios
			.post('/email/verification-notification',null, {signal});
	};

	const logout = async () => {
		if (user) {
			await axios.post('/logout', {signal});
			setUser(undefined);
		}
		navigate('/login');
	};

	return {
		user,
		abort,
		prelogin,
		login,
		logout,
		register,
		forgotPassword,
		resetPassword,
		resendEmailVerification,
	};
};
export type Auth = ReturnType<typeof useAuth>;

export const AuthContext = createContext<Auth>({} as Auth); // FIXME
export const useAuthContext=()=>useContext(AuthContext);
