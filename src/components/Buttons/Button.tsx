import type {MouseEventHandler} from 'react';
interface Param {
	type?: 'submit' | 'reset' | 'button',
	color?:'primary'|'secondary'|'danger',
	className?: string,
	disabled?: boolean,
	children?: React.ReactNode,
	onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Button({ type = 'submit', color='primary', className = "", disabled, children, onClick }: Param) {
	const colorMap={
		primary:'text-white bg-gray-800 border-transparent hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:ring-indigo-500',
		secondary:'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
		danger:'text-white bg-red-600 border-transparent hover:bg-red-500 active:bg-red-700 focus:ring-red-500'
	}
	return (
		<button
			type={type}
			onClick={onClick}
			className={
				`inline-flex justify-center items-center text-center px-4 py-2 shadow-sm border rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled ? 'opacity-25' : ""
				} ${colorMap[color]}` + " " + className
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
