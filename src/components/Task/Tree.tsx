import type { Subtask } from '@/models/Task';
import TextInput from '../Inputs/TextInput';
import { FiPlus } from 'react-icons/fi';

interface TaskTreeParam {
	tasks: Subtask[] | readonly Subtask[];
	update: (subtasks: Subtask[]) => any;
	isEditing?: boolean;
	level?: number;
}

export function TaskTree({ tasks, update, isEditing, level = 0 }: TaskTreeParam) {
	function handleStateChange(e: React.ChangeEvent<HTMLInputElement>) {
		const index = parseInt(e.target.name);
		const subtasks = [...tasks];
		subtasks[index].state = e.target.checked ? 3 : 0;
		console.log('task: handleChange', subtasks);
		update(subtasks);
	}
	function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const index = parseInt(e.target.name);
		const subtasks = [...tasks];
		subtasks[index].title = e.target.value ?? '';
		console.log('task: handleChange', subtasks);
		update(subtasks);
	}
	function handleAddSubtask() {
		update([...tasks, { title: '', state: 0, subtasks: [] }]);
	}
	function getSubtaskChangeHandler(index: number) {
		return (subtasks: Subtask[]) => {
			const newTasks = [...tasks];
			newTasks[index].subtasks = subtasks;
			console.log(`task: SubtaskChangeHandler_${index}`, newTasks);
			update(newTasks);
		};
	}
	return (
		<div className='px-2 py-1'>
			<ul>
				{tasks.map((task, i) => (
					<li key={level + '-' + i}>
						<div className='my-2 flex gap-2 whitespace-nowrap'>
						<TextInput type='checkbox' id={level + '-' + i} name={i.toString()} value={+task.state === 3} onChange={handleStateChange} />
							{
								isEditing
									? <EditBox i={i} task={task} handleTitleChange={handleTitleChange}/>
									: <label htmlFor={level + '-' + i} >{task.title}</label>
							}
						</div>
						{task.subtasks && task.subtasks.length > 0 && (
							<TaskTree
								tasks={task.subtasks}
								update={getSubtaskChangeHandler(i)}
								level={level + 1}
							/>
						)}
					</li>
				))}
				{isEditing && (
					<li
						className='bg-slate-50 rounded-md h-6 flex justify-center items-center m-2 hover:bg-slate-100'
						onClick={handleAddSubtask}
					><FiPlus /></li>
				)}
			</ul>
		</div>
	);
}

interface EditBoxParam {
	task: Subtask;
	handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	i: number;
	indent: () => void;
	outdent: () => void;
}
function EditBox({task,handleTitleChange,i, indent, outdent}: EditBoxParam){

	return <>
	<TextInput name={i.toString()} value={task.title} type='text' onChange={handleTitleChange} required maxLength={255} underlineStyle />
	</>
}
