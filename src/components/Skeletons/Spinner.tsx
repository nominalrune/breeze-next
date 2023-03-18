import type { TailwindLength } from '@/utiltype';
interface SpinnerProps {
	size?: TailwindLength;
	color?: "blue" | "red" | "green" | "yellow" | "gray" | "purple" | "pink" | "indigo" | "slate" ; // FIXME
}
export default function Spinner({ size="10", color="blue" }: SpinnerProps) {
	return (
		<div className={`animate-spin h-${size} w-${size} border-4 border-${color}-500 border-t-transparent rounded-full`}></div>);
}
