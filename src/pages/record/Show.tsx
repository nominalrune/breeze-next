import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import {axios} from '@/lib/useAxios';
import type { Record } from '@/models/Record';
import type {AuthParam} from '@/models/User';
export function Show({user}:AuthParam){
	const [eecord,setRecord]=useState<Record>();
	let { eecordId } = useParams();
	useEffect(()=>{
		axios.get('/api/eecords/'+eecordId).then(res=>{
			console.log({res})
			setRecord(res.data);
		})
	},[])
	
	return <div className='m-10 p-6 bg-white rounded'>
	<div className="m-1 flex justify-between items-end">
	<div className="m-3 text-3xl">{record?.title}</div>
	<div className=' '>
		<div className="m-1 text-xs text-right">作成: {new Date(record?.created_at).toLocaleString('ja-JP')}</div>
		<div className="m-1 text-xs text-right">更新: {new Date(record?.updated_at).toLocaleString('ja-JP')}</div>
	</div>
	</div>
	<hr/>
	<div className="m-3 text-slate-800">{record?.description}</div>
	<div className=""></div>
	
	</div>
}
