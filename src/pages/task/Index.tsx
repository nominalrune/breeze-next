import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import { IndexCard } from '@/components/Task/IndexCard';
import { IndexList } from '@/components/Task/IndexList';
import { TaskTree } from '@/components/Task/Tree';

import type { TaskDTO } from '@/models/Task';
import TaskService from '@/services/TaskService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
export function Index() {
	const { user } = useAuthContext();
	const [tasks, setTasks] = useState<TaskDTO[]>([]);
	async function updateTask(task: TaskDTO) {
		const taskService = new TaskService();
		await taskService.update(task).then(() => toast.success('Task updated'));
		setTasks(tasks.map(item => item.id === task.id ? task : item));
		return task;
	}
	useEffect(() => {
		const taskService = new TaskService();
		taskService.list().then(data => {
			setTasks(data);
		});
		return () => taskService.abort();
	}, []);
	return (
		<div className='p-3'>
			<h1 className='text-3xl '>
				Tasks
			</h1>
			<h2 className='text-xl'>Ongoing:</h2>
			<IndexList tasks={tasks.filter(item => item.state === 1)} user={user} update={updateTask} />
			<h2 className='text-xl'>Todo:</h2>
			<IndexList tasks={tasks.filter(item => item.state === 0)} user={user} update={updateTask} />
			<h2 className='text-xl'>Done:</h2>
			<IndexList tasks={tasks.filter(item => item.state === 3)} user={user} update={updateTask} />
			<h2 className='text-xl'>Pending:</h2>
			<IndexList tasks={tasks.filter(item => item.state === 2)} user={user} update={updateTask} />

			<Link to={'/tasks/create'}><FloatingActionButton icon="+" /></Link>
		</div>
	);
}
