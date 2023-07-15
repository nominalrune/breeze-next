import { Subtask, TaskDTO } from '@/models/Task';
import { FiChevronRight, FiCloudDrizzle, FiCloudLightning, FiCloudOff, FiMoreVertical, FiSun } from 'react-icons/fi';
import { CommentBody, CommentButton } from '../Comments/Comments';
import { TaskTree } from './Tree';
import TextInput from '../Inputs/TextInput';
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import Button from '../Buttons/Button';
import toast from 'react-hot-toast';

export function TaskItem({ task: _task, user, update }: { task: TaskDTO, user: any; update: (task: TaskDTO) => Promise<TaskDTO>; }) {
	const [showComments, setShowComments] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [task, setTask] = useState(_task);
	function setter(key: string) {
		return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setTask({ ...task, [key]: e.target.value });
	}
	function handleSubtaskUpdate(subtasks: Subtask[]) {
		const newTask = { ...task, subtasks };
		if (isEditing) { // change which can be cancelled
			setTask(newTask);
		} else { // state change which requires to be saved
			update(newTask);
		}
	}
	function handleSave() {
		setIsEditing(() => false);
		update(task);
	}
	function handleCancel() {
		setIsEditing(() => false);
		setTask(() => _task);
	}
	return (
		<div className='flex flex-col border-b-2 last:border-b-0 py-3 text-slate-800'>
			<div className='md:grid md:grid-rows-[7rem] md:grid-cols-5 gap-2 md:h-28 overflow-hidden'>
				<div className='md:col-span-2 px-2 flex flex-col'>
					{task.parent_task && <div className='flex items-center text-base '><Link className='underline decoration-slate-300' to={'/tasks/' + task.parent_task.id}>{task.parent_task.title}</Link><FiChevronRight className='text-slate-600' /></div>}
					{
						isEditing
							? <TextInput outerClassName='grow text-xl' type='text' name='title' value={task.title} onChange={setter('title')} />
							: <Link className='grow text-xl underline decoration-blue-300' to={'/tasks/' + task.id}><h2 className=' line-clamp-2'>{task.title}</h2></Link>
					}
					{isEditing
						? <TextInput className='grow' outerClassName='grow' type='textarea' name='description' value={task.description ?? ""} onChange={setter('description')} />
						: <div className=' line-clamp-4'>{task.description}</div>}
					{isEditing
						? <TextInput outerClassName='' type='date' name='due' value={task.due ?? ""} onChange={setter('due')} />
						: <span className={task.due ? "" : "text-slate-500"}>due: {task.due ?? "-"}</span>}
				</div>
				<div className='md:col-span-3 md:flex flex-row'>
					<div className='m-1 grow border-2 rounded-md overflow-scroll text-base font-mono'>
						<TaskTree tasks={task.subtasks ?? []} update={handleSubtaskUpdate} isEditing={isEditing} outdent={()=>{throw new Error("cannot outdent to the root task")}}/>
					</div>
					<div onMouseLeave={() => setShowMenu((showMenu) => false)} className='md:flex flex-col justify-start items-start'>
						<TaskMenu show={showMenu} isEditing={isEditing} edit={() => { setIsEditing(() => !isEditing); setShowMenu(false); }} task={task} update={update} cancel={handleCancel} />
						<div onClick={() => { setShowMenu((showMenu) => !showMenu); }} className='m-1 p-2 rounded-sm text-slate-500 text-lg hover:bg-slate-50'><FiMoreVertical /></div>
						<CommentButton className='' commentable={task} setOpen={() => { setShowMenu(false); setShowComments(true); }} />
					</div>
				</div>
			</div>
			{isEditing && (
				<div className='flex justify-end'>
					<Button color='secondary' className='m-1' onClick={handleCancel}>Cancel</Button>
					<Button className='m-1' onClick={handleSave}>Save</Button>
				</div>
			)}
			<CommentBody className='' open={showComments} commentable={task} loginUser={user} update={() => { }} />
		</div>
	);
}

function TaskMenu({ show, isEditing, edit, task, update, cancel }: {
	show: boolean,
	isEditing: boolean,
	edit: () => void,
	task: TaskDTO,
	update: (task: TaskDTO) => Promise<TaskDTO>,
	cancel: () => void;
}) {
	const className = 'p-2 px-6 rounded-sm text-base border-b-[1px] last:border-b-0 border-slate-200 hover:bg-slate-50';

	return show ? (<>
		<div className='absolute right-20 p-1 w-48 text-slate-500 bg-white rounded-md shadow-md text-center'>
			<div className='border-b-[1px] border-slate-200'>
				<SwitchStateButtons task={task} updateState={(newState: number) => update({ ...task, state: newState })} />
			</div>
			<div onClick={() => isEditing ? cancel() : edit()} className={className}>{isEditing ? "Cancel Edit" : "Edit"}</div>
			<div onClick={() => (true)} className={className}>Share</div>
			<div onClick={() => (true)} className={className}>Delete</div>
		</div>
	</>) : <></>;
};

function SwitchStateButtons({ task, updateState }: { task: TaskDTO, updateState: (state: number) => void; }) {
	function SwitchState({ children, action }: { children: React.ReactNode, action: string; }) {
		const handleClick = () => {
			updateState(action === 'todo' ? 0 : action === 'ongoing' ? 1 : action === 'done' ? 2 : 3);
		};
		const color = action === 'todo' ? 'slate' : action === 'ongoing' ? 'slate' : action === 'done' ? 'slate' : 'slate';
		return <div onClick={handleClick} title={action} className={`p-2 flex-grow flex justify-center rounded-md text-${color}-500 first:rounded-tl-xl last:rounded-tr-xl hover:bg-${color}-100 text-lg`}>{children}</div>;
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
