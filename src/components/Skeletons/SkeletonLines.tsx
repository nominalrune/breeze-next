interface SkeletonLinesProps {
	subject?:boolean,
	lines?:number,
}

export default function SkeletonLines({subject=true,lines=6}:SkeletonLinesProps) {
	const subjectLine =(<div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>);
	const Line=()=>(<div className={"m-3 h-3 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"+ `max-w-[${70 + Math.floor(Math.random() * 30)}%]`}></div>);
	return (
		<div role="status" className="max-w-sm animate-pulse">
			{subject && subjectLine}
			{[...Array(lines)].map((_,i)=><Line key={i}/>)}
		</div>
	);
}
