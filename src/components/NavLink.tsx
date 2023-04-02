import { NavLink as Nav } from "react-router-dom";
type Props = {
	children?: React.ReactNode,
	to: string,
	[other: string]: any;
};
const NavLink = ({ to, children, ...props }: Props) => (
	<Nav
		to={to}
		className={({ isActive, isPending }) =>
			`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${isActive
				? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
				: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
			}`
		}>
		{children}
	</Nav>
);

export default NavLink;
