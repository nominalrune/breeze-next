import type { Subtask } from '@/models/Task';
import TextInput from '../Inputs/TextInput';
interface Param {
	tasks: Subtask[];
	update: (subtasks:Subtask[]) => any;
}

export function TaskTree({ tasks,update }: Param) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>){
		const index=parseInt(e.target.name);
		const subtasks=[...tasks];
		subtasks[index].state=e.target.checked?3:0;
		console.log('task: handleChange',subtasks);
		update(subtasks);
	}
	function makeHandleChildChange(index:number){
		return (subtasks:Subtask[])=>{
		const newTasks=[...tasks];
		newTasks[index].subtasks=subtasks;
		console.log('task: handleChildChange',newTasks);
		update(newTasks);
	}}
	return (
		<div className='px-2 py-1'>
			<ul>
				{tasks.map((task,i) => (
					<li key={task.title}>
						<label className='flex gap-2 whitespace-nowrap'>
							<TextInput name={i+""} value={task.state} type='checkbox' onChange={handleChange} />
							{task.title}
						</label>
						{task.subtasks && task.subtasks.length > 0 &&(
							<TaskTree
								tasks={task.subtasks}
								update={makeHandleChildChange(i)}
								/>
							)}
					</li>
				))}
			</ul>
		</div>
	);
}
