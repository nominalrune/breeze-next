import type { Subtask } from '@/models/Task';
import TextInput from '../Inputs/TextInput';
import { FiChevronLeft, FiChevronRight, FiPlus, FiX } from 'react-icons/fi';
import { useId } from 'react';

interface TaskTreeParam {
	tasks: Subtask[];
	update: (subtasks: Subtask[]) => any;
	isEditing?: boolean;
	outdent: (i: number) => any;
	level?: number;
}
const buttonStyle = 'bg-slate-50 rounded h-6 flex justify-center items-center hover:bg-slate-100';

export function TaskTree({ tasks, update, isEditing, outdent, level = 0 }: TaskTreeParam) {
	const id = useId();
	function handleAddSubtask(index: number = tasks.length, subtask: Subtask = { title: "", state: 0, subtasks: [] }) {
		//@ts-expect-error
		update(tasks.toSpliced(index, 0, subtask));
	}
	function handleChange<T extends keyof Subtask>(i: number, key: T, value: Subtask[T]) {
		const newTasks = structuredClone(tasks);
		newTasks[i][key] = value;
		update(newTasks);
	}
	function _update(index: number, task: Subtask) { update(tasks.map((item, i) => index === i ? task : item)); }
	function _delete(index: number, task: Subtask) { update(tasks.filter((item, i) => index !== i)); }
	function indent(index: number) {
		if (index === 0) return;
		const child = tasks[index];
		const newTasks = tasks.filter((item, i) => index !== i);
		newTasks[index - 1].subtasks.push(child);
		update(newTasks);
	};
	function _outdent(index: number, j: number) {
		const newTask = structuredClone(tasks);
		const child = structuredClone(tasks[index].subtasks[j]);
		newTask[index].subtasks = tasks[index].subtasks.filter((_, i) => i !== j);
		newTask.splice(index + 1, 0, child);
		update(newTask);
	};
	return (
		<div className='ml-2 my-1'>
			<ul className={`border-slate-200 rounded-bl-md ${level > 0 ? "border-l-2" : ""}`}>
				{tasks.map((task, i) => (
					<li key={level + '-' + i} className='sm:ml-4'>
						<div className='my-2 flex items-center gap-2 whitespace-nowrap' style={{textWrap:"wrap"}}>
							<TextInput type='checkbox' id={id + i} value={+task.state === 3} onChange={e => { handleChange(i, "state", e.target.checked ? 3 : 0); }} />
							{
								isEditing
									? <EditBox i={i} task={task} update={_update} delete={_delete} indent={() => indent(i)} outdent={() => outdent(i)} />
									: <label htmlFor={id + i} className=''>{task.title}</label>
							}
						</div>
						<TaskTree
							tasks={task.subtasks ?? []}
							update={(subtasks) => handleChange(i, "subtasks", subtasks)}
							level={level + 1}
							isEditing={isEditing}
							outdent={(j) => _outdent(i, j)}
						/>
					</li>
				))}
				{isEditing &&  (
					<div
						className={buttonStyle + ' m-2'}
						onClick={() => handleAddSubtask()}
					><FiPlus /></div>
				)}
			</ul>
		</div>
	);
}

interface EditBoxParam {
	task: Subtask;
	update: (id: number, subtask: Subtask) => void;
	delete: (id: number, subtask: Subtask) => void;
	i: number;
	indent: () => void;
	outdent: () => void;
}
function EditBox({ task, update, delete: _delete, i, indent, outdent }: EditBoxParam) {
	function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
		update(i, { ...task, title: e.target.value ?? task.title });
	}
	function handleDeleteSubtask() {
		_delete(i, task);
	};
	return <>
		<TextInput outerClassName="grow" name={i.toString()} value={task.title} type='text' onChange={handleTitleChange} required={true} maxLength={255} underlineStyle />
		<div
			className={buttonStyle + ' m-2'}
			onClick={handleDeleteSubtask}
		><FiX /></div>
		<div className='flex m-2 rounded-md'>
		<FiChevronLeft className={buttonStyle} onClick={outdent} />
		<FiChevronRight className={buttonStyle} onClick={indent} />
		</div>
	</>;
}
