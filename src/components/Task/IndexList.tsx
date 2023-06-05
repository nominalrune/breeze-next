import { Link } from 'react-router-dom';
import TextInput from '@/components/Inputs/TextInput';
import { Comments, CommentBody, CommentButton } from '@/components/Comments/Comments';
import Button from '../Buttons/Button';
import type { TaskDTO } from '@/models/Task';
import { TaskTree } from './Tree';
import { FiChevronRight, FiX, FiMoreVertical, FiCloudDrizzle, FiCloudLightning, FiCloudOff, FiSun } from 'react-icons/fi';
import { Fragment, useState } from 'react';
import TaskService from '@/services/TaskService';
import { toast } from 'react-hot-toast';
interface Param {
	tasks: TaskDTO[],
	update: (task:TaskDTO) => Promise<void>,
	user: any;
}
export function IndexList({ tasks, user, update }: Param) {
	const length = tasks.length;
	return (
		<div className='block m-6 px-3 bg-white shadow rounded'>
			{length > 0
				? tasks.map((task, i) => (
					<Fragment key={task.id} >
						<TaskItem task={task} user={user} taskService={new TaskService()} update={update} />
					</Fragment>
				))
				: <div className='p-2 text-center text-slate-600 text-lg'>No tasks found</div>}
		</div>
	);
}


function TaskItem({ task, user, taskService, update }: { task: TaskDTO, user: any; taskService: TaskService; update: (task:TaskDTO) => Promise<void>; }) {
	const [showComments, setShowComments] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description ?? "");
	const [parentTask, setParentTask] = useState(task.parent_task);
	const [due, setDue] = useState(task.due);
	const [subtasks, setSubtasks] = useState(task.subtasks);
	const [state, setState] = useState(task.state);
	const [dueDate, setDueDate] = useState(task.due);
	return (
		<div className='flex flex-col border-b-2 last:border-b-0 py-3 text-slate-800'>
			<div className='md:grid  md:grid-rows-[7rem] md:grid-cols-6 gap-2 md:h-28 overflow-hidden'>
				<div className='md:col-span-2 px-2 flex flex-col'>
					{task.parent_task && <div className='flex items-center text-base '><Link className='underline decoration-slate-300' to={'/tasks/' + task.parent_task.id}>{task.parent_task.title}</Link><FiChevronRight className='text-slate-600' /></div>}
					{
						isEditing
							? <TextInput outerClassName='grow text-xl' type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
							: <Link className='grow text-xl underline decoration-blue-300' to={'/tasks/' + task.id}><h2 className=' line-clamp-2'>{task.title}</h2></Link>
					}
					{isEditing
						? <TextInput outerClassName='' type='date' name='due' value={due??""} onChange={(e) => setTitle(e.target.value)} />
						: <span className={task.due ? "" : "text-slate-500"}>due: {task.due ?? "-"}</span>}
				</div>
				<div className="md:col-span-2 p-1 flex" >
					{isEditing
						? <TextInput className='grow' outerClassName='grow' type='textarea' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
						: <div className=' line-clamp-4'>{task.description}</div>}
				</div>
				<div className='md:col-span-2  md:flex flex-row'>
					<div className='m-1 grow border-2 rounded-md overflow-scroll text-base font-mono'>
						<TaskTree tasks={task.subtasks ?? []} update={(subtasks) => update({ ...task, subtasks: subtasks })} />
					</div>
					<div onMouseLeave={() => setShowMenu((showMenu) => false)} className='md:flex flex-col justify-start items-start'>
						<TaskMenu show={showMenu} isEditing={isEditing} edit={() => { setIsEditing(() => !isEditing); setShowMenu(false); }} task={task} update={update} />
						<div onClick={() => { setShowMenu((showMenu) => !showMenu); }} className='m-1 p-2 rounded-sm text-slate-500 text-lg hover:bg-slate-50'><FiMoreVertical /></div>
						<CommentButton className='' commentable={task} setOpen={() => { setShowMenu(false); setShowComments(true); }} />
					</div>
				</div>
			</div>
			{isEditing && (
				<div className='flex justify-end'>
					<Button color='secondary' className='m-1' onClick={() => { setIsEditing(false); }}>Cancel</Button>
					<Button className='m-1' onClick={() => { setIsEditing(false); update({ ...task, title, description, due }); }}>Save</Button>
				</div>
			)}
			<CommentBody className='' open={showComments} commentable={task} loginUser={user} update={() => { }} />
		</div>
	);
}
function SwitchStateButtons({ task, updateState }: { task: TaskDTO, updateState: (state: number) => void; }) {
	function SwitchState({ children, action }: { children: React.ReactNode, action: string; }) {
		const handleClick = () => {
			updateState(action === 'todo' ? 0 : action === 'ongoing' ? 1 : action === 'done' ? 2 : 3);
		};
		const color=action === 'todo' ? 'blue' : action === 'ongoing' ? 'green' : action === 'done' ? 'orange' : 'slate';
		return <div onClick={handleClick} title={action} className={`p-2 flex-grow flex justify-center rounded-sm text-${color}-500 first:rounded-l-xl last:rounded-r-xl hover:bg-${color}-100 text-lg`}>{children}</div>;
	}
	function TodoButton() { return <SwitchState action={'todo'} ><FiCloudDrizzle /></SwitchState>; }
	function OnGoingButton() { return <SwitchState action={'ongoing'} ><FiCloudLightning /></SwitchState>; }
	function DoneButton() { return <SwitchState action={'done'} ><FiSun /></SwitchState>; }
	function PendingButton() { return <SwitchState action={'pending'} ><FiCloudOff /></SwitchState>; }
	return (
		<div className='flex gap-1'>
			{task.state !== 0 && <TodoButton />}
			{task.state !== 1 && <OnGoingButton />}
			{task.state !== 2 && <DoneButton />}
			{task.state !== 3 && <PendingButton />}
		</div>
	);
}
function TaskMenu({ show, isEditing, edit, task, update }: {
	show: boolean,
	isEditing: boolean,
	edit: () => void,
	task: TaskDTO,
	update: (task: TaskDTO) => Promise<TaskDTO>,
}) {
	const className = 'p-2 px-6 rounded-sm text-base border-b-[1px] last:border-b-0 border-slate-200 hover:bg-slate-50';

	return show||true ? (<>
		<div className='absolute right-20 p-1 w-48 text-slate-500 bg-white rounded-md shadow-md text-center'>
			<SwitchStateButtons task={task} updateState={(newState: number) => update({ ...task, state: newState }).then(() => { toast.success('Task Updated!'); }, () => { toast.error('Oops, Some error occurred'); })} />
			{task.state < 3 && <div onClick={() => { (new TaskService()).completeTask(task).then(() => { toast.success('Task Completed!'); }, () => { toast.error('Oops, Some error occurred'); }); }} className={className}>Mark as Done</div>}
			<div onClick={() => edit()} className={className}>{isEditing ? "Cancel Edit" : "Edit"}</div>
			<div onClick={() => (true)} className={className}>Share</div>
			<div onClick={() => (true)} className={className}>Delete</div>
		</div>
	</>) : <></>;
};

