import type {Subtask} from '@/models/Task'
interface Param{
	tasks:Subtask[]
}

export function TaskTree({tasks}:Param){
	return(
		<div className='p-3'>
			<ul>
				{tasks.map(task=>(
					<li key={task.title}>
						{task.title}
						{task.subtasks&&task.subtasks.length>0&&<TaskTree tasks={task.subtasks}/>}
					</li>
				))}
			</ul>
		</div>
	)
}
