import ApplicationLogo from '@/components/ApplicationLogo';
import Dropdown from '@/components/Dropdown';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavLink from '@/components/NavLink';
// import { NavLink } from "react-router-dom";
import ResponsiveNavLink, {
	ResponsiveNavButton,
} from '@/components/ResponsiveNavLink';
import { DropdownButton } from '@/components/DropdownLink';
import { useAuthContext } from '@/hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
export default function Navigation() {
	const { user, logout } = useAuthContext();
	const [open, setOpen] = useState(false);
	useEffect(() => {
		console.log({ user });
	}, []);
	const links = [
		{ link: '/dashboard', label: 'Dashboard' },
		{ link: '/tasks', label: 'Tasks' },
		{ link: '/records', label: 'Records' },
		{ link: '/calendar', label: 'Calendar' },
	];
	return (
		<nav className="bg-white border-b border-gray-100">
			{/* Primary Navigation Menu */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						{/* Logo */}
						<div className="flex-shrink-0 flex items-center">
							<Link to="/dashboard">
								<ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
							</Link>
						</div>

						{/* Navigation Links */}
						{
							links.map(({ link, label }) =>
								<NavigationLink key={link} link={link} label={label} />
							)
						}
					</div>

					{/* Settings Dropdown */}
					<div className="hidden sm:flex sm:items-center sm:ml-6">
						{user ? <Dropdown
							trigger={
								<button className="flex items-center text-sm font-medium text-gray-800 p-2 rounded-sm hover:opacity-75 hover:bg-slate-50 focus:outline-none transition duration-150 ease-in-out">
									<div>{user?.name}</div>
									<FiChevronDown className="ml-1 h-4 w-4" />
								</button>
							}>
							<DropdownButton onClick={()=>{}}>
								Profile
							</DropdownButton>
							<DropdownButton onClick={logout}>
								Logout
							</DropdownButton>
						</Dropdown>
							: (<Link to="/login"
								className='font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out'>
								Login</Link>
							)}
					</div>

					<Hamburger open={open} onClick={() => setOpen(open => !open)} />
				</div>
			</div>

			{/* Responsive Navigation Menu */}
			{open && (<div className="block sm:hidden">
				<div className="pt-2 pb-3 space-y-1">
					<NavLink
						to="/dashboard">
						Dashboard
					</NavLink>
				</div>
				<div className="pt-2 pb-3 space-y-1">
					<NavLink
						to="/tasks"
					>
						Tasks
					</NavLink>
				</div>
				<div className="pt-2 pb-3 space-y-1">
					<NavLink
						to="/records"
					>
						Records
					</NavLink>
				</div>
				<div className="pt-2 pb-3 space-y-1">
					<NavLink
						to="/calendar"
					>
						Calendar
					</NavLink>
				</div>
				{/* Responsive Settings Options */}
				{user && <div className="pt-4 pb-1 border-t border-gray-200">
					<div className="flex items-center px-4">
						<div className="flex-shrink-0">
							<svg
								className="h-10 w-10 fill-current text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<div className="font-medium text-base text-gray-800">
								{user?.name}
							</div>
							<div className="font-medium text-sm text-gray-500">
								{user?.email}
							</div>
						</div>
					</div>
					<div className="mt-3 space-y-1">
						{/* Authentication */}
						<ResponsiveNavButton onClick={logout}>
							Logout
						</ResponsiveNavButton>
					</div>
				</div>}
			</div>
			)}
		</nav>
	);
};


function NavigationLink({ link, label }: { link: string, label: string; }) {
	return <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
		<NavLink
			to={link}
			active={new RegExp(`${link}(\/.*)?$`).test(location.pathname)}
		>
			{label}
		</NavLink>
	</div>;
}
function Hamburger({ open, onClick }: { open: boolean, onClick: () => void; }) {
	return <div className="-mr-2 flex items-center sm:hidden">
		<button
			onClick={onClick}
			className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
			<svg
				className="h-6 w-6"
				stroke="currentColor"
				fill="none"
				viewBox="0 0 24 24">
				{open ? (
					<path
						className="inline-flex"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				) : (
					<path
						className="inline-flex"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				)}
			</svg>
		</button>
	</div>;
}
