import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';

import type { Record, RecordDTO } from '@/models/Record';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import type { UserDTO } from '@/models/User';
import { axios, csrf } from '@/lib/axios';
import { useMonth } from '@/hooks/useMonth';
import MonthSelector from '@/components/MonthSelector';
import { Table } from '@/components/Table';
import { Comments } from '@/components/Comments/Comments';
import { Comment } from '@/models/Comment';
import {useAuth} from '@/hooks/useAuth';
import SkeletonCard from '@/components/Skeletons/SkeletonCard';

export function Index() {
	const {user}=useAuth();
	const [records, setRecords] = useState<RecordDTO[]|undefined>();
	const { month, setNextMonth, setPrevMonth } = useMonth(new Date());
	function update() {
		axios.get<RecordDTO[]>(`/records?month=${month.getFullYear()}-${month.getMonth() + 1}`).then(({ data }) => {
			console.log({ data });
			setRecords(data);
		});
	}
	useEffect(() => {
		setRecords(undefined);
		update();
	}, [month]);
	return (
		<div>
			<div>
				<MonthSelector month={month} onClickNext={setNextMonth} onClickPrevious={setPrevMonth} />
				<h1 className='p-3 text-3xl '>
					records
				</h1></div>
			{/* <Table items={records} keys={['date',"title",'time','description']} /> */}
			{
				!records ?<div className='p-3'><SkeletonCard /></div>: records?.length > 0 ? records.map(record => (
					<div key={"records" + record.id} className='block m-6 p-3 bg-white shadow rounded'>
						<Link to={'/records/' + record.id}><h2 className='p-3 text-xl underline decoration-blue-300'>{record.title}</h2></Link>
						<p className='px-6 text-slate-800' >{record.description}</p>
						<Comments commentable={record} loginUser={user} update={update} />
					</div>
				)) : <>no data found</>
			}
			<Link to={'/records/create'}><FloatingActionButton icon="+" /></Link>
		</div>
	);
}
