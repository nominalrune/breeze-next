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
		<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<ErrorBoundary>
				{/* <Cartain open={!auth?.user}> */}
					<Outlet />
				{/* </Cartain>
				{!auth?.user&&<WaitAndThenShowLogin auth={auth!}/>} */}
			</ErrorBoundary>
		</main>
	</div>;
};

export default AppLayout;
