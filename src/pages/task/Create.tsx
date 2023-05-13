import { useState } from 'react';
import EditForm from '@/components/Inputs/EditForm';
import { useNavigate } from "react-router-dom";
import type { Property } from '@/components/Inputs/EditForm';
// import type {AuthParam} from '@/models/User';
import NestedForm, { NestedIterableAttr, NestedAttr, FormModel } from '@/components/Inputs/NestedForm';
import TaskService from '@/services/TaskService';
import { toast } from 'react-hot-toast';


export function Create() {
	const taskService = new TaskService();
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
			type: 'select',
			name: "state",
			label: 'state',
			defaultValue: "0",
			options: [
				["todo", "0"],
				["in progress", "1"],
				["done", "2"]
			],
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
				type: 'select',
				defaultValue: "0",
				options: [
					["todo", "0"],
					["in progress", "1"],
					["done", "2"]
				],
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
					defaultValue: "0",
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
						type: 'select',
						defaultValue: "0",
						options: [
							["todo", "0"],
							["in progress", "1"],
							["done", "2"],
						],
					}]
				} ]
			},
			]
		}
	] as const;
	const Form = NestedForm<typeof props, 6>;
	return (
		<div className="m-3 p-3">
			<Form
				properties={props}
				primaryAction={{
					label: "submit",
					onClick: (data) => {
						taskService.create(data).then(task => {
							navigate("/tasks/" + task.id);
							toast.success("task created");
						});
					}
				}}
				cancelAction={{ label: "cancel", onClick: () => { } }}
			/>
		</div>);
}
