import { createContext, useEffect } from 'react';
import type { UserDTO } from '@/models/User';
import { useAuth } from '@/hooks/useAuth';


export const AuthContext = createContext<ReturnType<typeof useAuth>>({} as ReturnType<typeof useAuth>);
export function AuthProvider({ children }: { children: React.ReactNode; }) {
	const auth = useAuth();
	useEffect(() => {
		if (!auth.user) {
			console.log("no user");
			auth.prelogin();
		}
	}, []);
	console.log("@AuthContext, rerender", { auth });
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
