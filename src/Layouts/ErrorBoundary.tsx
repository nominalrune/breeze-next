import React from 'react';
import { FiAlertOctagon } from 'react-icons/fi';

interface ErrorState {
	hasError: boolean;
	error: any;
	errorInfo: any;
}


export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorState> {
	constructor(props: any) {
		super(props);
		this.state = {
			hasError: false,
			error: undefined,
			errorInfo: undefined
		};
	}
	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}
	componentDidCatch(error: any, errorInfo: any) {
		// You can also log the error to an error reporting service
		this.setState({ error, errorInfo })
		console.info({ error, errorInfo })
	}
	render() {
		if (this.state.hasError) {
			return <div className='grid justify-center w-full'>
				<div className='bg-red-300/20 rounded-md m-3 p-5 '>
					<h1 className='text-2xl flex gap-2 items-center'><FiAlertOctagon className='text-red-600' />エラーが発生しました</h1>
					<div className="bg-red-50 rounded-xl m-6 p-3 px-6">
						<p className='text-lg'>{this.state.error?.message}</p>
						<p className='text-sm bg-white text-slate-600 max-h-40 overflow-y-scroll'>{this.state.error?.stack}</p>
					</div>
				</div>
			</div>;
		} else {
			return this.props.children;
		}
	}
}
