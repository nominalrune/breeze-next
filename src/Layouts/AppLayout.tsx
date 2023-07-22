import Navigation from '@/Layouts/Navigation';
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from './ErrorBoundary';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Skeletons/Spinner';
import { Cartain } from '@/components/Skeletons/Cartain';
import { LoginForm } from '@/components/Login/LoginForm';
import { Auth, useAuthContext } from '@/hooks/useAuth';


const AppLayout = () => {
	const auth = useAuthContext();
	return <div className="min-h-screen bg-gray-100">
		<Navigation />
		<Toaster />
		<Cartain open={!auth?.user}>
			<Outlet />
		</Cartain>
	</div>;
};

export default AppLayout;
