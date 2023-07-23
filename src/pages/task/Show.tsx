import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from '@/lib/axios';
import type { TaskDTO, Subtask } from '@/models/Task';
import type { User, UserDTO } from '@/models/User';
import TextInput from '@/components/Inputs/TextInput';
import Button from '@/components/Buttons/Button';

import SkeletonLine from '@/components/Skeletons/SkeletonLine';
import SkeletonLines from '@/components/Skeletons/SkeletonLines';
import { FiEdit } from 'react-icons/fi';
import Spinner from '@/components/Skeletons/Spinner';
import { TaskTree } from '@/components/Task/Tree';
import { toast } from 'react-hot-toast';

export function Show({ user }: { user: UserDTO|undefined; }) {
	const [task, setTask] = useState<TaskDTO | undefined>();
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { taskId } = useParams();

	useEffect(() => {
		axios.get('/tasks/' + taskId).then((res) => {
			setTask(res.data);
		});
	}, [taskId]);

	function handleEdit() {
		setIsEditing(()=>true);
	}
	function handleCancel() {
		setIsEditing(()=>false);
	}
	async function handleSubmit(newTask: TaskDTO) {
		setIsSubmitting(true);
		try {
			const res = await axios.put('/tasks/' + taskId, newTask);
			setTask(()=>({ ...newTask, ...res.data }));
			setIsEditing(false);
		} finally {
			setIsSubmitting(false);
		}
	}
	if (!task) {
		return <Spinner />;
	} else if (isEditing) {
		return <TaskEdit task={task} onCancel={handleCancel} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
	} else {
		return <TaskView task={task} onEdit={handleEdit} onSubmit={handleSubmit} />;
	}
}

type TaskViewProps = {
	task: TaskDTO;
	onEdit: () => void;
	onSubmit: (task: TaskDTO) => void;
};
function TaskView({ task, onEdit, onSubmit }: TaskViewProps) {
	function handleSubtaskUpdate(subtasks: Subtask[]) {
		const newTask = { ...task, subtasks };
		onSubmit(newTask);
	}
	return (
		<ViewFrame
			title={<>
				<div className="m-3 text-3xl">{task ? task.title : <SkeletonLine subject={true} />}</div>
				<div className='m-1 text-xs text-right '>
					<div className="">作成: {task ? new Date(task.created_at).toLocaleString('ja-JP') : <SkeletonLine />}</div>
					<div className="">更新: {task ? new Date(task.updated_at).toLocaleString('ja-JP') : <SkeletonLine />}</div>
				</div>
			</>}
			description={<div className="m-6 text-slate-800">{task.description || <div className='text-slate-600'>(no description)</div>}</div>}
			subtaskArea={<div className="m-3 text-slate-800">
				<TaskTree
					tasks={task.subtasks ?? []}
					update={handleSubtaskUpdate}
					isEditing={false}
					outdent={() => { throw new Error("you cannot append to root parent"); }}
				/>
			</div>}
			footer={task && <div
				className="m-1 p-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-800"
				onClick={onEdit}
			>
				<FiEdit />
			</div>}
		/>
	);
}

type TaskEditProps = {
	task: TaskDTO;
	onCancel: () => void;
	onSubmit: (task: TaskDTO) => Promise<void>;
	isSubmitting: boolean;
};

function TaskEdit({ task, onCancel, onSubmit, isSubmitting }: TaskEditProps) {
	const [taskUnderEdit, setTaskUnderEdit] = useState(structuredClone(task));
	function initialize() {
		setTaskUnderEdit(()=>structuredClone(task));
	}
	function handleChange<T extends keyof TaskDTO>(key: T, value: TaskDTO[T]) {
		setTaskUnderEdit((taskUnderEdit) => ({ ...taskUnderEdit, [key]: value }));
	}
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onSubmit(taskUnderEdit);
	}
	function handleCancel(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		initialize();
		onCancel();
	}

	return (
		<form onSubmit={handleSubmit}>
			<ViewFrame
				title={<>
					<div className="m-3 text-3xl">
						<TextInput
							type="text"
							name='title'
							value={taskUnderEdit.title}
							onChange={(e) => handleChange('title', e.target.value)}
							required={true}
						/>
					</div>
					<div className='m-1 text-xs text-right '>
						<div className="">作成: {new Date(task.created_at).toLocaleString('ja-JP')}</div>
						<div className="">更新: {new Date(task.updated_at).toLocaleString('ja-JP')}</div>
					</div>
				</>}
				description={
					<div className="m-3 text-slate-800">
						<TextInput
							type="textarea"
							name='description'
							value={taskUnderEdit.description ?? ""}
							onChange={(e) => handleChange('description', e.target.value)}
						/>
					</div>
				}
				subtaskArea={<div className="m-1 text-slate-800">
					<TaskTree
						tasks={taskUnderEdit.subtasks ?? []}
						update={(subtasks)=>handleChange("subtasks", subtasks)}
						isEditing={true}
						outdent={() => { throw new Error("you cannot append to root parent"); }}
					/>
				</div>}
				footer={
					<>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? <Spinner size={'3'} color='slate' /> : 'Save'}
						</Button>
						<Button color='secondary' onClick={handleCancel}>Cancel</Button>
					</>
				}
			/>
		</form>
	);
}

type ViewFrameProps = {
	title: React.ReactNode;
	description: React.ReactNode;
	subtaskArea: React.ReactNode;
	footer: React.ReactNode;
};
function ViewFrame({ title, description, subtaskArea, footer }: ViewFrameProps) { // FIXME とんでもない非効率....！
	return (
		<div className="m-1 sm:m-10 sm:p-6 bg-white rounded">
			<div className="m-1 flex justify-between items-end">
				{title}
			</div>
			<hr />
			<div className="m-1 sm:m-3 text-slate-800">
				{description}
			</div>
			<hr />
			{subtaskArea}
			<hr />
			<div className="m-1 sm:m-3 flex flex-row-reverse gap-3">
				{footer}
			</div>
		</div>
	);
}


