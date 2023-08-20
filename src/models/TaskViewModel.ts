import { Task } from './Task';
import BaseViewModel from './BaseViewModel';
export default class TaskViewModel implements BaseViewModel<Task> {
	public model;
	constructor(task?:Task){
		this.model = {
			id:{
				value:task?.id,
				dataType:'number',
				label:'ID',
				form:{
					type:'text',
				}
			},
			title:{
				value:task?.title,
				dataType:'string',
				label:'Title',
				form:{
					type:'text',
				}
			},
			description:{
				value:task?.description,
				dataType:'string',
				label:'Description',
				form:{
					type:'textarea',
				}
			},
			state:{
				value:task?.state,
				dataType:'number',
				label:'State',
				form:{
					type:'select',
					options:[
						{value:0,label:'New'},

						{value:1,label:'In Progress'},
						{value:2,label:'Done'},
					]


				}
			},
			owner_id:{
				value:task?.owner_id,
				dataType:'number',
			},
			parent_task_id:{
				value:task?.parent_task_id,
			},
			due:{
				value:task?.due,
				dataType:'date',
			},
			subtasks:{
				value:task?.subtasks,
				dataType:'array',
			},
		}
	}
};
