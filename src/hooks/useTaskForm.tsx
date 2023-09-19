import { Subtask, TaskDTO } from '@/models/Task';

export type TaskFormState = {
	state: number,
	title: string,
	description: string | undefined,
	parent_task_id: number | undefined,
	due: Date | undefined,
	subtasks: Subtask[],
};
const defaultState: TaskFormState = {
	state: 0,
	title: '',
	description: undefined,
	parent_task_id: undefined,
	due: undefined,
	subtasks: [],
}
interface UseFormParams<T> {
	currentValues: T;
}
export default function useTaskForm(currentValues:TaskDTO){
	const defaultValues= {
		state: 0,
	title: '',
	description: undefined,
	parent_task_id: undefined,
	due: undefined,
	subtasks: [],
	};
	const validations= {
	};
	onSubmit: (values: T) => any;
	onSuccess?: () => void;
	onError?: (error:unknown) => any;
}
