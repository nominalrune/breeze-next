import Navigation from '@/Layouts/Navigation';
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from './ErrorBoundary';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Skeletons/Spinner';
import { Cartain } from '@/components/Skeletons/Cartain';
import { LoginForm } from '@/components/Login/LoginForm';
import { Auth,useAuthContext} from '@/hooks/useAuth';


const AppLayout = () => {
	const auth = useAuthContext();
	return <div className="min-h-screen bg-gray-100">
		<Navigation />
		<Toaster />
		<main>
			<ErrorBoundary>
				{/* <Cartain open={!auth?.user}> */}
					<Outlet />
				{/* </Cartain>
				{!auth?.user&&<WaitAndThenShowLogin auth={auth!}/>} */}
			</ErrorBoundary>
		</main>
	</div>;
};
function WaitAndThenShowLogin({ auth }: { auth:Auth }) {
	const [showLogin, setShowLogin] = useState(false);
	useEffect(() => {
		if (auth.user) { return; }
		console.log('useEffect: WaitAndThenShowLogin')
		const token = setTimeout(() => {
			if (auth.user) { return; }
			auth.prelogin().then(
				(result) => {
					if (result === true) {
						console.log("prelogin success")
						return;
					} else {
						console.log("prelogin fail")

						setShowLogin(true);
					}
				},
				result => {
					console.log("prelogin fail", result)
						setShowLogin(true);
				}
			);
		}, 0);
		return () => clearTimeout(token);
	}, []);
	return (
		<div className="fixed w-full h-full grid items-center justify-center">
			{showLogin?<LoginForm/>:<Spinner color='white' />}
		</div>
	);
}
export default AppLayout;
