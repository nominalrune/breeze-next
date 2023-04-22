import { useState } from 'react';
import EditForm from '@/components/Inputs/EditForm';
import { useNavigate } from "react-router-dom";
// import create from '@/models/Task/create';
import { axios, csrf } from '@/lib/axios';
import type { Property } from '@/components/Inputs/EditForm';
// import type {AuthParam} from '@/models/User';
import NestedForm, { NestedIterableAttr,NestedAttr,FormModel } from '@/components/Inputs/NestedForm';
import TaskService from '@/services/TaskService';


export function Create() {
	const navigate = useNavigate();
	const [errors, setErrors] = useState<any>();
	function handleSuccess(res: { data: { id: number; }, url: string; }) {
		const id = res.data.id;
		navigate("/tasks/" + id);
	}
	const props = [
		{
			name: 'title',
			label: 'title',
			type: 'text',
			defaultValue: "",
		},
		{
			name: 'due',
			label: 'due',
			type: 'date',
			defaultValue: "",
		},
		{
			type: 'textarea',
			name: 'description',
			label: 'description',
			defaultValue: "",
		}, {
			type: 'number',
			name: "status",
			label: 'status',
			defaultValue: 0
		},
		{
			type: "number",
			name: "parent_task_id",
			label: 'parent_task_id',
			defaultValue: ""
		},
		{
			type: "nested-iterable",
			name: "subtasks",
			label: 'subtasks',
			model: [{
				name: 'title',
				label: 'title',
				type: 'text',
				defaultValue: ""
			}, {
				name: 'state',
				label: 'state',
				type: 'number',
				defaultValue: 0,
			}, {
				name: "subtasks",
				label: "subtasks",
				type: "nested-iterable",
				"defaultValue": [],
				"model": [{
					name: 'title',
					label: 'title',
					type: 'text',
					defaultValue: ""
				}, {
					name: 'state',
					label: 'state',
					type: 'number',
					defaultValue: 0,
				}, {
					name: "subtasks",
					label: "subtasks",
					type: "nested-iterable",
					model: [{
						name: 'title',
						label: 'title',
						type: 'text',
						defaultValue: ""
					}, {
						name: 'state',
						label: 'state',
						type: 'number',
						defaultValue: 0,
					}]
				} satisfies NestedIterableAttr<2> ]
			}satisfies NestedIterableAttr<3>,
			]
		}
    ] as const;
	const Form=NestedForm<typeof props, 6> ;
return (
	<div className="m-3 p-3">
		{/* <EditForm
		properties={props}
		method="post"
		route='/api/tasks'
		submitLabel="submit"
		handleSuccess={handleSuccess} /> */}
		<Form
			properties={props}
			primaryAction={{
				label: "submit",
				onClick: (data) => {
					TaskService.create(data).then(task=>navigate("/tasks/" + task.id));
				}
			}}
			//api.post('/api/tasks',data).then(res=>console.log(res.data));}}}
			cancelAction={{ label: "cancel", onClick: () => { } }}
		/>
	</div>);
}
