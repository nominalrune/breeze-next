import Navigation from '@/Layouts/Navigation';
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import { Cartain } from '@/components/Skeletons/Cartain';
import { UserDTO } from '@/models/User/User';


const AppLayout = ({user, guest=false}:{user:UserDTO|undefined, guest:boolean}) => {
	return <div className="min-h-screen bg-gray-100">
		<Navigation />
		<Toaster />
		<Cartain open={(guest||!user)&&!location.href.match('login')} spinner>
			<Outlet />
		</Cartain>
	</div>;
};

export default AppLayout;
