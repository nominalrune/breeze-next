
export function Cartain({children, open=true}:{children:React.ReactNode, open:boolean}){
	return open?(<>
		<div role="status"
		className="fixed w-full h-full overflow-hidden bg-black opacity-80"
		>
		</div>
			<div className="fixed w-full h-full overflow-hidden animate-pulse bg-slate-400 opacity-80">
			{children}
			</div></>
	):<>{children}</>;
}
