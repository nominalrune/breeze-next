import type React from 'react';
interface Param {
	type?: 'submit' | 'reset' | 'button',
	className?: string,
	disabled?: boolean,
	children?: React.ReactNode,
	onClick?: () => void | Promise<void>,
}

export default function PrimaryButton({ type = 'submit', className = "", disabled, children, onClick }: Param) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={
				className + " " + `inline-flex justify-center items-center text-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled ? 'opacity-25' : ""
				} `
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
