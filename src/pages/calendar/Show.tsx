import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import {api} from '@/hooks/useApi';
import type { CalendarEvent } from '@/models/CalendarEvent';
import type { UserDTO } from '@/models/User';

export function Show({user}:{user?:UserDTO}){
	const [event,setEvent]=useState<CalendarEvent>();
	let { calendarId } = useParams();
	useEffect(()=>{
		api.get('/calendar/'+calendarId).then(res=>{
			console.log({res})
			setEvent(res.data);
		})
	},[])

	return <div className='m-10 p-6 bg-white rounded'>
	<div className="m-1 flex justify-between items-end">
	<div className="m-3 text-3xl">{event?.title}</div>
	<div className=' '>
		<div className="m-1 text-xs text-right">start at: {new Date(event?.start_at).toLocaleString('ja-JP')}</div>
		<div className="m-1 text-xs text-right">end at: {new Date(event?.end_at).toLocaleString('ja-JP')}</div>
	</div>
	</div>
	<hr/>
	<div className="m-3 text-slate-800">{event?.description}</div>
	<div className=""></div>

	</div>
}
