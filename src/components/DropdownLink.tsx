import { Link } from "react-router-dom";
import { Menu } from '@headlessui/react';
type Props = {
	children?: React.ReactNode,
	[other: string]: any;
};
const classString='w-full text-left block px-4 py-2 text-sm leading-5 border-b-[1px] border-slate-100 last:border-b-0 text-gray-700 hover:bg-slate-50 focus:outline-none transition duration-150 ease-in-out';
const DropdownLink = ({ children, to, ...props }: Props & { to: string; }) => (
	<Link
		to={to}
		{...props}
		className={classString}>
		{children}
	</Link>
);

export const DropdownButton = ({ children, ...props }: Props) => (
	<button
		className={classString}
		{...props}>
		{children}
	</button>
);

export default DropdownLink;
