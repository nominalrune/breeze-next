import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import { TaskTree } from '@/components/Task/Tree';

import type { TaskDTO } from '@/models/Task';
import TaskService from '@/services/TaskService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export function Index() {
	const [tasks, setTasks] = useState<TaskDTO[]>([]);
	useEffect(() => {
		TaskService.list().then(data => {
			console.log({ data });
			setTasks(data);
		});
	}, []);
	return (
		<div>
			<h1 className='p-3 text-3xl '>
				Tasks
			</h1>
			{
				tasks ? tasks.map(task => (
					<Link key={"task" + task.id} to={'/tasks/' + task.id} className='block m-6 p-3 bg-white shadow roundeed hover:bg-slate-50'>
						<h2 className='p-3 text-xl'>{task.title}</h2>
						<p className='p-1  text-slate-800' >{task.description}</p>
						{task.subtasks&&<><p className='p-2 text-slate-700 text-base font-mono'><TaskTree tasks={task.subtasks}/></p></>}
					</Link>
				)) : <>no data found</>
			}
			<Link to={'/tasks/create'}><FloatingActionButton icon="+" /></Link>
		</div>
	);
}
