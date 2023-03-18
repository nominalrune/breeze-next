interface SkeletonLineProps {
	subject?:boolean,
}

export default function SkeletonLine({subject=false}:SkeletonLineProps) {
	const subjectLine =(<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>);
	const Line=()=>(<div className="h-2 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>);
	return (
		<div role="status" className="max-w-sm animate-pulse">
			{subject ? subjectLine: <Line/>}
		</div>
	);
}
