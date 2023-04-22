import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from '@/lib/axios';
import type { TaskDTO, Task } from '@/models/Task';
import type { AuthParam } from '@/models/User';
import TextInput from '@/components/Inputs/TextInput';
import Button from '@/components/Buttons/Button';

import SkeletonLine from '@/components/Skeletons/SkeletonLine';
import SkeletonLines from '@/components/Skeletons/SkeletonLines';
import { FiEdit } from 'react-icons/fi';
import Spinner from '@/components/Skeletons/Spinner';
import { TaskTree } from '@/components/Task/Tree';

type ViewFrameProps = {
	title: React.ReactNode;
	description: React.ReactNode;
	subtaskArea: React.ReactNode;
	footer: React.ReactNode;
};
function ViewFrame({ title, description,subtaskArea, footer }: ViewFrameProps) { // FIXME とんでもない非効率....！
	return (
		<div className="m-10 p-6 bg-white rounded">
			<div className="m-1 flex justify-between items-end">
				{title}
			</div>
			<hr />
			<div className="m-3 text-slate-800">
				{description}
			</div>
			<hr />
			{subtaskArea}
			<hr />
			<div className="m-3 flex flex-row-reverse gap-3">
				{footer}
			</div>
		</div>
	);
}

type TaskViewProps = {
	task: TaskDTO | undefined;
	onEdit: () => void;
};
function TaskView({ task, onEdit }: TaskViewProps) {
	return (
		<ViewFrame
			title={<>
				<div className="m-3 text-3xl">{task ? task.title : <SkeletonLine subject={true} />}</div>
				<div className='m-1 text-xs text-right '>
					<div className="">作成: {task ? new Date(task.created_at).toLocaleString('ja-JP') : <SkeletonLine />}</div>
					<div className="">更新: {task ? new Date(task.updated_at).toLocaleString('ja-JP') : <SkeletonLine />}</div>
				</div>
			</>}
			description={<div className="m-3 text-slate-800">{task ? task.description : <SkeletonLines subject={false} lines={4} />}</div>}
			subtaskArea={<div className="m-3 text-slate-800">{task&&task.subtasks? <TaskTree tasks={task.subtasks}/> : <SkeletonLines subject={false} lines={4} />}</div>}
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
	const [taskUnderEdit, setTaskUnderEdit] = useState<TaskDTO>(task);
	function handleChange<T extends keyof TaskDTO>(key: T, value: TaskDTO[T]) {
		setTaskUnderEdit((taskUnderEdit) => ({ ...taskUnderEdit, [key]: value }));
	}
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onSubmit(taskUnderEdit);
	}

	return (
		<form onSubmit={handleSubmit}>
			<ViewFrame
				title={<>
					<div className="m-3 text-3xl">
						<TextInput
							name='title'
							value={taskUnderEdit.title}
							onChange={(e) => handleChange('title', e.target.value)}
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
				subtaskArea={<div className="m-3 text-slate-800">{task&&task.subtasks? <TaskTree tasks={task.subtasks}/> : <SkeletonLines subject={false} lines={4} />}</div>}
				footer={
					<>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? <Spinner size={'3'} color='slate' /> : 'Save'}
						</Button>
						<Button color='secondary' onClick={onCancel}>Cancel</Button>
					</>
				}
			/>
		</form>
	);
}



export function Show({ user }: AuthParam) {
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
		setIsEditing(true);
	}
	function handleCancel() {
		setIsEditing(false);
	}
	async function handleSubmit(task: TaskDTO) {
		setIsSubmitting(true);
		try {
			await axios.post('/tasks/' + taskId, task);
			setTask(task);
			setIsEditing(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	}
	if(isEditing){
		return <TaskEdit task={task!} onCancel={handleCancel} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
	}else{
		return <TaskView task={task} onEdit={handleEdit} />;
	}
}
