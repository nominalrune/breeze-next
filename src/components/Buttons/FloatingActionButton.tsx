type FloatingActionButtonParams = {
	icon: React.ReactNode,
    type?: 'submit'|'reset'|'button',
    // className?: string,
    // processing?: boolean,
    children?: React.ReactNode,
    onClick?: () => void | Promise<void>,
}


export function FloatingActionButton({ icon, onClick }: FloatingActionButtonParams) {
	return (
		<button
			className="fixed flex justify-center items-center rounded-[50%] bottom-0 right-0 m-8 w-10 h-10 bg-blue-500 text-white shadow-xl hover:bg-blue-400"
			onClick={onClick}
		>
			{icon}
		</button>
	);
}
