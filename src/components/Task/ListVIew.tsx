import { IndexList } from '@/components/Task/IndexList';
import { TaskDTO } from '@/models/Task';
import { UserDTO } from '@/models/User';

export default function ListView({ tasks, user, update }: { tasks: TaskDTO[], user: UserDTO | undefined, update: (task: TaskDTO) => Promise<TaskDTO>; }) {
	return <>
		<h2 className='text-xl'>Ongoing:</h2>
		<IndexList tasks={tasks.filter(item => item.state === 1)} user={user} update={update} />
		<h2 className='text-xl'>Todo:</h2>
		<IndexList tasks={tasks.filter(item => item.state === 0)} user={user} update={update} />
		<h2 className='text-xl'>Done:</h2>
		<IndexList tasks={tasks.filter(item => item.state === 3)} user={user} update={update} />
		<h2 className='text-xl'>Pending:</h2>
		<IndexList tasks={tasks.filter(item => item.state === 2)} user={user} update={update} />
	</>;
}
