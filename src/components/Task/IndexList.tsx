import { Link } from 'react-router-dom';

import { Comments, CommentBody, CommentButton } from '@/components/Comments/Comments';
import Button from '../Buttons/Button';
import type { TaskDTO } from '@/models/Task';
import { TaskTree } from './Tree';
import { FiChevronRight, FiX, FiMoreVertical } from 'react-icons/fi';
import { Fragment, useState } from 'react';
import TaskService from '@/services/TaskService';
interface Param {
	tasks: TaskDTO[],
	// update: any,
	user: any;
}

export function IndexList({ tasks, user }: Param) {
	const length = tasks.length;
	return (
		<div className='block m-6 p-3 bg-white shadow rounded'>
			{tasks.map((task, i) => (
				<Fragment key={task.id} >
					<TaskItem task={task} user={user} taskService={new TaskService()} />
					{length !== i + 1 && <hr />}
				</Fragment>
			))
			}
		</div>
	);
}


function TaskItem({ task, user, taskService }: { task: TaskDTO, user: any; taskService:TaskService; }) {
	const [showComments, setShowComments] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [parentTask, setParentTask] = useState(task.parent_task);
	const [subtasks, setSubtasks] = useState(task.subtasks);
	const [state, setState] = useState(task.state);
	const [dueDate, setDueDate] = useState(task.due);
	function update(newTask:TaskDTO){
		// if((typeof newTask['id'])!=='number'){return}
		taskService.update(newTask).then(data=>{
			console.log({data});
		});
	}
	return (
		<div className='flex flex-col'>
			<div className='md:grid  md:grid-rows-[7rem] md:grid-cols-6 gap-2 md:h-28 overflow-hidden'>
				<div className='md:col-span-2 flex flex-col'>
					{task.parent_task && <div className='flex items-center text-base '><Link className='underline decoration-slate-300' to={'/tasks/' + task.parent_task.id}>{task.parent_task.title}</Link><FiChevronRight className='text-slate-600' /></div>}
					<Link className='p-2 line-clamp-3 text-xl underline decoration-blue-300' to={'/tasks/' + task.id}><h2>{task.title}</h2></Link>
					{task.due}
				</div>
				<div className={`md:col-span-2 p-1 text-slate-800 line-clamp-4`} >{task.description}</div>
				<div className='md:col-span-2  md:flex flex-row'>
					<div className='m-2 grow border-2 rounded-md overflow-scroll text-slate-700 text-base font-mono'>
						<TaskTree tasks={task.subtasks ?? []} update={(subtasks)=>update({...task,subtasks:subtasks})} />
					</div>
					<div className='md:flex flex-col justify-start items-start'>
						<TaskMenu show={showMenu} setIsEditing={setIsEditing} />
						<div onClick={()=>setShowMenu((showMenu)=>!showMenu)} className='m-1 p-2 rounded-sm text-slate-500 text-lg hover:bg-slate-50'><FiMoreVertical /></div>
						<CommentButton className='' commentable={task} setOpen={setShowComments} />
					</div>
				</div>
			</div>
			<CommentBody className='' open={showComments} commentable={task} loginUser={user} update={() => { }} />
		</div>
	);
}

function TaskMenu({show,setIsEditing}:{
	show:boolean,
	setIsEditing:React.Dispatch<React.SetStateAction<boolean>>,
}){
	const className='p-2 px-6 rounded-sm text-base border-b-[1px] last:border-b-0 border-slate-200 hover:bg-slate-50';
return show?(<>
	<div className='absolute right-20 p-1 text-slate-500 bg-white rounded-md shadow-md text-center'>
		<div onClick={()=>(true)} className={className}>Mark as Done</div>
		<div onClick={()=>setIsEditing(()=>true)} className={className}>Edit</div>
		<div onClick={()=>(true)} className={className}>Share</div>
		<div onClick={()=>(true)} className={className}>Delete</div>
	</div>
</>):<></>;
}

