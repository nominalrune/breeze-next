import { TaskDTO } from '@/models/Task';
import { UserDTO } from '@/models/User';
import { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { IndexList } from './IndexList';
import { TaskItem } from './TaskItem';
export default function KanbanView({ tasks, user, update }: { tasks: TaskDTO[], user: UserDTO | undefined, update: (task: TaskDTO) => Promise<TaskDTO>; }) {
	const onDragEnd: OnDragEndResponder = useCallback((result) => {
		const { source, destination } = result;
		// dropped outside the list
		if (!destination) {
			return;
		}
		if (source.droppableId === destination.droppableId) {
			return;
		}
		const task = tasks.find(item => item.id === parseInt(result.draggableId));
		if (!task) {
			return;
		}
		task.state = ['todo', 'ongoing', 'pending', 'done'].indexOf(destination.droppableId);
		return update(task);
	}, []);
	const contents = [{
		name: "todo",
		tasks: tasks.filter(item => item.state === 0)
	}, {
		name: "ongoing",
		tasks: tasks.filter(item => item.state === 1)
	}, {
		name: "done",
		tasks: tasks.filter(item => item.state === 3)
	}, {
		name: "pending",
		tasks: tasks.filter(item => item.state === 2)
	},
	];
	const droppableClass = 'bg-white rounded-md shadow-md border-2 border-slate-200 p-2 m-2';
	return <DragDropContext onDragEnd={onDragEnd}>
		<div className='grid grid-flow-col'>
			{contents.map(item => <Droppable droppableId={item.name}>
				{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef}
					className={droppableClass}>
					<h2 className='text-2xl font-bold text'>{item.name}</h2>
					{item.tasks.map((task, i) => (
						<Draggable key={task.id} draggableId={task.id.toString()} index={i}>
							{(provided, snapshot) => <div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className='bg-white rounded-md shadow-md p-2 my-2'
							>
								<TaskItem task={task} user={user} update={update} />
							</div>}
						</Draggable>))}
					{provided.placeholder}
				</div>)}
			</Droppable>)}
		</div>
	</DragDropContext>;
}
