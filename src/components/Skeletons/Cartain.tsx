import Spinner from './Spinner';

export function Cartain({ children, open = true, spinner = false }: { children: React.ReactNode, open: boolean, spinner: boolean; }) {
	return open ? (<>
		<div role="status"
			className="fixed w-full h-full overflow-hidden bg-black opacity-80"
		>
		</div>
		<div className="fixed w-full h-full overflow-hidden animate-pulse bg-slate-400 opacity-80">
			{spinner && <div className='w-full h-full flex justify-center items-center'><Spinner className='m-auto'/></div>}
			{children}
		</div></>
	) : <>{children}</>;
}
