import { useState } from 'react';
import EditForm from '@/components/Inputs/EditForm';
import { useNavigate } from "react-router-dom";
// import create from '@/models/Task/create';
import {api,csrf} from '@/hooks/useApi';
import type {Property} from '@/components/Inputs/EditForm';
import type {AuthParam} from '@/models/User';
import NestedForm,{Attr} from '@/components/Inputs/NestedForm';


export function Create({user}:AuthParam) {
	const navigate=useNavigate();
    const [errors, setErrors]=useState<any>()
    function handleSuccess(res:{data:{id:number},url:string}) {
        const id=res.data.id;
        navigate("/tasks/"+id);
    }
    const props=[
        {
            name:'title',
            label:'title',
            type:'text',
            defaultValue:"",
        },
        {
            name:'due',
			label:'due',
            type:'date',
            defaultValue:"",
        },
        {
            type:'textarea',
            name:'description',
			label:'description',
            defaultValue:"",
        },{
            type:'number',
            name:"status",
			label:'status',
            defaultValue:0
        },
        {
            type:"number",
            name:"parent_task_id",
			label:'parent_task_id',
            defaultValue:""
        },
        {
            type:"nested-iterable",
            name:"subtasks",
			label:'subtasks',
			defaultValue:[],
			unit:3,
			model:[{
				name:'title',
				label:'title',
				type:'text',
				defaultValue:""
			},{
				name:'state',
				label:'state',
				type:'number',
				defaultValue:0,
			},{
			name:"subtasks",
			label:"subtasks",
			type:"nested-iterable",
			"defaultValue":[],
			"unit":3,
			"model":[{
					name:'title',
					label:'title',
					type:'text',
					defaultValue:""
				},{
					name:'state',
					label:'state',
					type:'number',
					defaultValue:0,
			},{
				name:"subtasks",
				label:"subtasks",
				type:"nested-iterable",
				"defaultValue":[],
				"unit":2,
				"model":[{
						name:'title',
						label:'title',
						type:'text',
						defaultValue:""
					},{
						name:'state',
						label:'state',
						type:'number',
						defaultValue:0,
				}]
				}]
			}
			]

        }
    ] satisfies [Attr,Attr,Attr,Attr,Attr,Attr<3>];
    return (
        <div className="m-3 p-3">
        {/* <EditForm
		properties={props}
		method="post"
		route='/api/tasks'
		submitLabel="submit"
		handleSuccess={handleSuccess} /> */}
		<NestedForm
		 properties={props}
		 primaryAction={{label:"submit",onClick:(data)=>{
			 csrf().then(res=>api.post('/api/tasks',data)).then(res=>console.log(res.data));}}}
			 //api.post('/api/tasks',data).then(res=>console.log(res.data));}}}
		 cancelAction={{label:"cancel",onClick:()=>{}}}
		 />
    </div>);
}
