import { ErrorBoundary } from './ErrorBoundary';

export default function Main({children}: {children: React.ReactNode}) {
	return <main className='max-w-7xl mx-auto px-6'>
	<ErrorBoundary>
		{children}
	</ErrorBoundary>
</main>
}
