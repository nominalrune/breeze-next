import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from '@/lib/useAxios';
import type { Task } from '@/models/Task';
import type { AuthParam } from '@/models/User';

import SkeletonLine from '@/components/Skeletons/SkeletonLine';
import SkeletonLines from '@/components/Skeletons/SkeletonLines';

export function Show({ user }: AuthParam) {
	const [task, setTask] = useState<Task>();
	let { taskId } = useParams();
	useEffect(() => {
		axios.get('/api/tasks/' + taskId).then(res => {
			console.log({ res });
			setTask(res.data);
		});
	}, []);

	return (<div className='m-10 p-6 bg-white rounded'>
		<div className="m-1 flex justify-between items-end">
			<div className="m-3 text-3xl">{task?task?.title:<SkeletonLine subject={true}/>}</div>
			<div className=' '>
				<div className="m-1 text-xs text-right">作成: {task?new Date(task.created_at).toLocaleString('ja-JP'):<SkeletonLine />}</div>
				<div className="m-1 text-xs text-right">更新: {task?new Date(task.updated_at).toLocaleString('ja-JP'):<SkeletonLine />}</div>
			</div>
		</div>
		<hr />
		<div className="m-3 text-slate-800">{task?task?.description:<SkeletonLines subject={false} lines={4}/> }</div>
		<div className=""></div>

	</div>);
}
