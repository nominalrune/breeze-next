import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import { IndexCard } from '@/components/Task/IndexCard';
import { TaskTree } from '@/components/Task/Tree';

import type { TaskDTO } from '@/models/Task';
import TaskService from '@/services/TaskService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
export function Index() {
	const {user}=useAuth();
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
					<IndexCard key={task.id} task={task} user={user} />
				)) : <>no data found</>
			}
			<Link to={'/tasks/create'}><FloatingActionButton icon="+" /></Link>
		</div>
	);
}
