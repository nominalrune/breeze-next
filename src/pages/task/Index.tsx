import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import { IndexCard } from '@/components/Task/IndexCard';
import { IndexList } from '@/components/Task/IndexList';
import { TaskTree } from '@/components/Task/Tree';

import type { TaskDTO } from '@/models/Task';
import TaskService from '@/services/TaskService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuth';
export function Index() {
	const taskService = new TaskService();
	const {user}=useAuthContext();
	const [tasks, setTasks] = useState<TaskDTO[]>([]);
	useEffect(() => {
		taskService.list().then(data => {
			console.log({ data });
			setTasks(data);
		});
		return ()=>{taskService.abort();}
	}, []);
	return (
		<div>
			<h1 className='p-3 text-3xl '>
				Tasks
			</h1>
					<IndexList tasks={tasks} user={user} />
			<Link to={'/tasks/create'}><FloatingActionButton icon="+" /></Link>
		</div>
	);
}
