import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import {api} from '@/hooks/useApi';
import type { TaskDTO } from '@/models/Task';
export function Show({user}:Param){
	const [task,setTask]=useState<TaskDTO>();
	let { taskId } = useParams();
	useEffect(()=>{
		api.get('/api/tasks/'+taskId).then(res=>{
			console.log({res})
			setTask(res.data);
		})
	},[])

	return <div className='m-10 p-6 bg-white rounded'>
	<div className="m-1 flex justify-between items-end">
	<div className="m-3 text-3xl">{task?.title}</div>
	<div className=' '>
		<div className="m-1 text-xs text-right">作成: {new Date(task?.created_at).toLocaleString('ja-JP')}</div>
		<div className="m-1 text-xs text-right">更新: {new Date(task?.updated_at).toLocaleString('ja-JP')}</div>
	</div>
	</div>
	<hr/>
	<div className="m-3 text-slate-800">{task?.description}</div>
	<div className=""></div>

	</div>
}
