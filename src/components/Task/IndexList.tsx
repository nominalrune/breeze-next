import type { Subtask, TaskDTO } from '@/models/Task';
import { ChangeEvent, Fragment, useState } from 'react';
import { TaskItem } from './TaskItem';
interface Param {
	tasks: TaskDTO[],
	update: (task: TaskDTO) => Promise<TaskDTO>,
	user: any;
}
export function IndexList({ tasks, user, update }: Param) {
	const length = tasks.length;
	return (
		<div className='block m-6 px-3 bg-white shadow rounded'>
			{length > 0
				? tasks.map((task) => (
					<Fragment key={task.id} >
						<TaskItem task={task} user={user} update={update} />
					</Fragment>
				))
				: <div className='p-2 text-center text-slate-600 text-lg'>No tasks found</div>}
		</div>
	);
}


