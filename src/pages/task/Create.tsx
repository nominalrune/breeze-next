import { useState } from 'react';
import EditForm from '@/components/Inputs/EditForm';
import { useNavigate } from "react-router-dom";
// import create from '@/models/Task/create';

import type {Property} from '@/components/Inputs/EditForm';
import type {AuthParam} from '@/models/User';


export function Create({user}:AuthParam) {
	const navigate=useNavigate();
    const [errors, setErrors]=useState<any>()
    function handleSuccess(res:{data:{id:number},url:string}) {
        const id=res.data.id;
        navigate("/tasks/"+id);
    }
    const props:Property[]=[
		{
			propName:'type',
			type:'text',
			defaultValue:"task",
		},
        {
            propName:'title',
            type:'text',
            defaultValue:"",
        },
        {
            propName:'due',
            type:'date',
            defaultValue:"",
        },
        {
            type:'textarea',
            propName:'description',
            defaultValue:"",
        },{
            type:'number',
            propName:"status",
            defaultValue:0
        },
        {
            type:"number",
            propName:"parent_task_id",
            defaultValue:""
        },
        {
            type:"number",
            propName:"assigned_to_id",
            defaultValue:user?.id||"",
        }
    ];
    return (
        <div className="m-3 p-3">
        <EditForm properties={props} method="post" route='/api/tasks' submitLabel="submit" handleSuccess={handleSuccess} />
    </div>);
}
