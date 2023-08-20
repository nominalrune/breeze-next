interface SpinnerProps {
	className?: string;
}
export default function Spinner({ className="" }: SpinnerProps) {
	return (
		<div className={`animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full ${className}`}></div>);
}
