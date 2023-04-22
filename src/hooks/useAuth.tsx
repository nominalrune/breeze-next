import { axios, abort as _abort, csrf } from '@/lib/axios';
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
	},[]);
	const navigate = useNavigate();
	function abort() {
		_abort();
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
		const res = await axios.get('/login');
		if (res.status >= 400) {
			setUser(()=>undefined);
			return false;
		} else if (res.status < 300) {
			setUser(()=>res.data);
		return !!res.data;
		}
	}
	async function login(inputs: LoginInputs, navigateIfAuthenticated: string = "/") {
		const {email, password, remember} = inputs;
		// if (user && user.email !== inputs.email) {
		// 	await logout();
		// }
		if (await prelogin()) {
			navigate(navigateIfAuthenticated);
		}
		const res = await axios.post("/login", { email, password , remember});
		if (res.status === 200) {
			setUser(()=>res.data);
			navigate(navigateIfAuthenticated);
		}
	};
	const register = async (inputs: RegisterInputs, navigateIfAuthenticated: string = "/") => { //FIXME
		await csrf();
		axios
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
		await csrf();

		axios
			.post('/forgot-password', { email })
			.catch(error => {
				// if (error.response.status !== 422) throw new Error(error);
				throw new Error(error);
			});
	};

	const resetPassword = async (props: any) => { //FIXME
		const { token } = useParams();
		await csrf();
		axios
			.post('/reset-password', { token, ...props })
			.then(response =>
				navigate('/login?reset=' + btoa(response.data.status)),
			)
			.catch(error => {
				if (error.response.status !== 422) throw new Error(error);
			});
	};

	const resendEmailVerification = () => {
		axios
			.post('/email/verification-notification', null);
	};

	const logout = async () => {
		if (user) {
			await axios.post('/logout');
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
export const useAuthContext = () => useContext(AuthContext);
