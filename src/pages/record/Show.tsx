import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import {axios} from '@/lib/axios';
import { Record, type RecordDTO } from '@/models/Record';
// import type {AuthParam} from '@/models/User';
import { Comments } from '@/components/Comments/Comments';
import { Comment } from '@/models/Comment';
export function Show({user}:AuthParam){
	const [record,setRecord]=useState<Record>();
	let { recordId } = useParams();
	function update(){
		axios.get('/records/'+recordId).then(res=>{
			console.log({res})
			setRecord(Record.fromDTO(res.data));
		})
	}
	useEffect(()=>{
		update()
	},[])

	return record?(<div className='m-10 p-6 bg-white rounded'>
	<div className="m-1 flex justify-between items-end">
	<div className="m-3 text-3xl">{record?.title}</div>
	<div className=' '>
		<div className="m-1 text-xs text-right">作成: {record.created_at.toLocaleString()}</div>
		<div className="m-1 text-xs text-right">更新: {record.updated_at.toLocaleString()}</div>
	</div>
	</div>
	<hr/>
	<div className="m-3 text-slate-800">{record?.description}</div>
	<Comments commentable={record} loginUser={user} update={update} open={true} />

	</div>):<>loading</>;
}
