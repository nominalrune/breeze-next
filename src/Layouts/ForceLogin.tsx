// import { useContext } from 'react';

import { LoginForm } from '@/components/Login/LoginForm';
import Spinner from '@/components/Skeletons/Spinner';
import { useAuthContext, type Auth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export function ForceLogin({ children }: { children: React.ReactNode}) {
	const auth = useAuthContext();
	return (
		auth.user
			? <>{children}</>
			:
			<div className="fixed w-full h-full grid items-center justify-center">
				<LoginForm />
			</div>
	);
}

// function WaitAndThenShowLogin({ auth }: { auth: Auth; }) {
// 	const [showLogin, setShowLogin] = useState(false);
// 	useEffect(() => {
// 		if (auth.user) { return; }
// 		console.log('useEffect: WaitAndThenShowLogin');
// 		const token = setTimeout(() => {
// 			if (auth.user) { return; }
// 			auth.prelogin().then(
// 				(result) => {
// 					if (result === true) {
// 						console.log("prelogin success");
// 						return;
// 					} else {
// 						console.log("prelogin fail");

// 						setShowLogin(true);
// 					}
// 				},
// 				result => {
// 					console.log("prelogin fail", result);
// 					setShowLogin(true);
// 				}
// 			);
// 		}, 0);
// 		return () => clearTimeout(token);
// 	}, []);
// 	return (
// 		<div className="fixed w-full h-full grid items-center justify-center">
// 			{showLogin ? <LoginForm /> : <Spinner color='white' />}
// 		</div>
// 	);
// }
