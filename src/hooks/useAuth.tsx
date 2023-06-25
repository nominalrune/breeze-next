import { api,axios, abort as _abort, csrf } from '@/lib/axios';
import { useState, useContext, createContext, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import type { UserDTO } from '@/models/User';


export const useAuth = () => {
	const [user, setUser] = useState<UserDTO>();
	useEffect(() => {
		prelogin();
		// 	// return () => {
		// 	// 	abort();
		// 	// };
	}, []);
	const navigate = useNavigate();
	function abort() {
		// _abort();
		// setUser(undefined);
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
			const res = await api().get('/login');
			if (res.status >= 300) {
				setUser(() => undefined);
				return false;
			} else{
				setUser(() => res.data);
				return !!res.data;
			}
		}
		catch {
			setUser(() => undefined);
		}


	}
	async function login(inputs: LoginInputs, navigateIfAuthenticated: string = "/") {
		const { email, password, remember } = inputs;
		if (await prelogin()) {
			navigate(navigateIfAuthenticated);
		}
		await api().csrf();
		const res = await api().post("/login", { email, password, remember });
		if (res.status === 200) {
			setUser(() => res.data);
			navigate(navigateIfAuthenticated);
		}
	};
	const register = async (inputs: RegisterInputs, navigateIfAuthenticated: string = "/") => { //FIXME
		await api().csrf();
		// FIXME axiosインスタンスをあたらしく作る必要があるのでは？
		api()
			.post('/register', inputs)
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
		// await csrf();

		api()
			.post('/forgot-password', { email })
			.catch(error => {
				// if (error.response.status !== 422) throw new Error(error);
				throw new Error(error);
			});
	};

	const resetPassword = async (props: any) => { //FIXME
		const { token } = useParams();
		// await csrf();
		api()
			.post('/reset-password', { token, ...props })
			.then(response =>
				navigate('/login?reset=' + btoa(response.data.status)),
			)
			.catch(error => {
				if (error.response.status !== 422) throw new Error(error);
			});
	};

	const resendEmailVerification = () => {
		api()
			.post('/email/verification-notification', null);
	};

	const logout = async () => {
		setUser(undefined);
		await api().post('/logout');
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
export const useAuthContext = () => useContext(AuthContext);
