import Navigation from '@/Layouts/Navigation';
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import { Cartain } from '@/components/Skeletons/Cartain';
import { LoginForm } from '@/components/Login/LoginForm';
import { UserDTO } from '@/models/User';


const AppLayout = ({user}:{user:UserDTO|undefined}) => {
	return <div className="min-h-screen bg-gray-100">
		<Navigation />
		<Toaster />
		<Cartain open={!user&&!location.href.match('login')} spinner>
			<Outlet />
		</Cartain>
	</div>;
};

export default AppLayout;
