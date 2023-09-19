import api from '@/lib/axios';
import { useParams, useNavigate, type NavigateFunction } from "react-router-dom";
import { type UserDTO } from '@/models/User/User';
import { type StateCreator, StoreApi } from 'zustand';
import useUser from '@/hooks/useUser';

export type Auth = ReturnType<typeof useAuth>;

// export const AuthContext = createContext<Auth | undefined>(undefined); // FIXME
// export const useAuthContext = () => useContext(AuthContext);
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
interface AuthState {
	user: UserDTO | undefined;
	login: (inputs: LoginInputs, navigateIfAuthenticated?: string) => Promise<void>;
	register: (inputs: RegisterInputs, navigateIfAuthenticated?: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (props: any) => Promise<void>;
	resendEmailVerification: () => void;
	logout: () => Promise<void>;
}
type ExtractState<S> = S extends {
	getState: () => infer T;
} ? T : never;
// {
//     (): ExtractState<S>;
//     <U>(selector: (state: ExtractState<S>) => U): U;
//     <U>(selector: (state: ExtractState<S>) => U, equalityFn: (a: U, b: U) => boolean): U;
// } & S
type StateSelector<U = AuthState[keyof AuthState]> = ((state: ExtractState<StoreApi<AuthState>>) => U);
type EqualityFn<U = AuthState[keyof AuthState]> = ((a: U, b: U) => boolean);
interface Param {
	selector?: StateSelector;
	equalityFn?: EqualityFn;
	navigate?: NavigateFunction | ((to: string) => void);
}
// navigate: NavigateFunction | ((url: string) => void)
export default function useAuth() {
	const { user, setUser } = useUser();
	const navigate = useNavigate();
	const prelogin = async () => {
		if (user) return true;
		try {
			// await api().csrf();
			const res = await api().get('/login');
			if (res.ok === false) {
				setUser(undefined);
				return false;
			} else {
				const data = await res.json();
				setUser(data);
				return !!data;
			}
		} catch {
			setUser(undefined);
		}
		return false;
	};
	const login = async function (inputs: LoginInputs, navigateIfAuthenticated: string = "/") {
		const { email, password, remember } = inputs;
		if (await prelogin()) {
			// location.href = navigateIfAuthenticated;
			navigate(navigateIfAuthenticated);
		}
		await api().csrf();
		const res = await api().post("/login", { email, password, remember });
		// console.log(res.json());
		if (res.ok) {
			setUser(await res.json());
			navigate(navigateIfAuthenticated);
			// location.href = navigateIfAuthenticated;
		}
		return res;
	};
	const register = async (inputs: RegisterInputs, navigateIfAuthenticated: string = "/") => { //FIXME
		await api().csrf();
		return api()
			.post('/register', inputs)
			.then(async(res) => {
				setUser(await res.json());
				navigate(navigateIfAuthenticated);
				// location.href = navigateIfAuthenticated;
			});
	};
	const forgotPassword = async (email: string) => { //FIXME
		await api().csrf();
		return api()
			.post('/forgot-password', { email });
	};
	const resetPassword = async (props: any) => { //FIXME
		await api().csrf();
		const { token } = useParams();
		return api()
			.post('/reset-password', { token, ...props })
			.then(async (response) =>
				navigate('/login?reset=' + btoa((await response.json()).status)),
				// location.href = '/login?reset=' + btoa(response.data.status),
			);
	};
	const resendEmailVerification = async () => {
		await api().csrf();
		api()
			.post('/email/verification-notification', null);
	};
	const logout = async () => {
		await api().csrf();
		setUser(undefined);
		await api().post('/logout');
		navigate('/login');
	};
	return {
		user,
		login,
		register,
		forgotPassword,
		resetPassword,
		resendEmailVerification,
		logout,
	};
};
