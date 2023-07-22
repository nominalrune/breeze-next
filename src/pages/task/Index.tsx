import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import { IndexCard } from '@/components/Task/IndexCard';

import type { TaskDTO } from '@/models/Task';
import TaskService from '@/services/TaskService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { FiServer, FiTrello } from 'react-icons/fi';
import ListView from '@/components/Task/ListVIew';
import KanbanView from '@/components/Task/KanbanView';
import { UserDTO } from '@/models/User';
import Main from '@/Layouts/Main';
export function Index() {
	const { user } = useAuthContext();
	const [tasks, setTasks] = useState<TaskDTO[]>([]);
	const [view, setView] = useState<'list' | 'kanban'>('list');
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
	function buttonClass(on: boolean = false) {
		return `text-4xl p-1 border-2 border-slate-300 first:rounded-l-md last:rounded-r-md last:border-l-0 hover:bg-slate-50 ${on ? 'bg-slate-200' : ''}`;
	}
	return <Main>
		<div className='py-3 flex justify-between'>
			<h1 className='text-3xl'>
				Tasks
			</h1>
			<div className='flex text-slate-600 mr-2'>
				<FiServer onClick={() => setView('list')} className={buttonClass(view === "list")} />
				<FiTrello onClick={() => setView('kanban')} className={buttonClass(view === 'kanban')} />
			</div>
		</div>
		<hr />
		<div className='py-3'>
			<TaskView view={view} tasks={tasks} user={user} update={updateTask} />
		</div>
		<Link to={'/tasks/create'}><FloatingActionButton icon="+" /></Link>
	</Main>;
}

function TaskView({ view, tasks, user, update }: { view: string, tasks: TaskDTO[], user: UserDTO | undefined, update: (task: TaskDTO) => Promise<TaskDTO>; }) {
	return view === 'list'
		? <ListView tasks={tasks} user={user} update={update} />
		: <KanbanView tasks={tasks} user={user} update={update} />;
}

