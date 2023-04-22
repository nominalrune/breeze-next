import { useState } from 'react';
import EditForm from '@/components/Inputs/EditForm';
import { useNavigate } from 'react-router-dom';
// import create from '@/models/Task/create';

import type { Property } from '@/components/Inputs/EditForm';
import type { AuthParam } from '@/models/User';
import toast from 'react-hot-toast';

export function Create({ user }: AuthParam) {
	const [errors, setErrors] = useState<any>();
	const navigate = useNavigate();
	function handleSuccess(res: { data: { data: any, url: string; }; }) {
		console.log("handleSuccess", res);
		const id = res.data.id;
		navigate("/records/" + id);
		toast.success("new record created!");
	}
	const props: Property[] = [
		{
			type: 'text',
			propName: 'title',
			defaultValue: "",
		},
		{
			type: 'textarea',
			propName: 'description',
			defaultValue: "",
		},
		{
			type: 'number',
			propName: "status",
			defaultValue: 0
		},
		{
			type: 'date',
			propName: "date",
			label: "date",
			defaultValue: new Date().toISOString().slice(0,10)
		},
		{
			type: 'number',
			propName: "time",
			label: "time",
			defaultValue: 5,
			attributes:{
				min:0,
				max:60*12,
				step:5
			}
		},
	];
	return (
		<div className="m-3 p-3">
			<EditForm properties={props} method="post" route='/records' submitLabel="submit" handleSuccess={handleSuccess} />
		</div>);
}
