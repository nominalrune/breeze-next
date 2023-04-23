import { Link } from 'react-router-dom';

import { Comments } from '@/components/Comments/Comments';
import Button from '../Buttons/Button';
import type { TaskDTO } from '@/models/Task';
import { TaskTree } from './Tree';
import { FiChevronRight, FiX } from 'react-icons/fi';
interface Param {
	task: TaskDTO,
	// update: any,
	user: any;
}

export function IndexCard({ task, user }: Param) {

	return (<div key={task.id} className='block m-6 p-3 bg-white shadow rounded'>
		<div className='flex flex-row flex-wrap gap-2'>
			<div className='grow'>
				<Link to={'/tasks/' + task.id}><h2 className='p-3 text-xl underline decoration-blue-300'>{task.title}</h2></Link>
				<p className='p-1  text-slate-800' >{task.description}</p>
				{task.subtasks && <><p className='p-2 text-slate-700 text-base font-mono'><TaskTree tasks={task.subtasks} /></p></>}
			</div>
			<div className='w-44 p-6 flex flex-col gap-6'>
				<div className='flex flex-col items-end'>
					<FiX/>
				</div>
				<div className='flex flex-col gap-6'>
					<Button type={'button'} color={'primary'}>done</Button>
					<Button type={'button'} color={'primary'}>edit</Button>
				</div>
			</div>
		</div>
		<div className='grid grid-flow-col'>
		{task.parentTask&&<div>{task.parentTask.parentTask&&(<>{task.parentTask.parentTask.title}<FiChevronRight/></>)}{task.parentTask.title}</div>}
		</div>
		<Comments className='' commentable={task} loginUser={user} update={() => { }} />
	</div>);
}
