import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';

import type { Record, RecordDTO } from '@/models/Record';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { axios, csrf } from '@/lib/axios';
import { useMonth } from '@/hooks/useMonth';
import MonthSelector from '@/components/MonthSelector';
import { Comments } from '@/components/Comments/Comments';
import { useAuthContext } from '@/hooks/useAuth';
import SkeletonCard from '@/components/Skeletons/SkeletonCard';
import { FiPlus } from 'react-icons/fi';
import RecordEditModal from '@/components/Record/RecordEditModal';
import { Dialog } from '@/components/Modals/Dialog';
import Main from '@/Layouts/Main';

export function Index() {
	const { user } = useAuthContext();
	const [records, setRecords] = useState<RecordDTO[] | undefined>();
	const { month, setNextMonth, setPrevMonth } = useMonth(new Date());
	function update() {
		axios.get<RecordDTO[]>(`/records?month=${month.getFullYear()}-${(month.getMonth() + 1).toString().padStart(2, "0")}`).then(({ data }) => {
			console.log({ data });
			setRecords(data);
		});
	}
	useEffect(() => {
		setRecords(undefined);
		update();
	}, [month]);
	const [show, setShow] = useState(false);
	return (
		<>
			<div>
				<MonthSelector month={month} onClickNext={setNextMonth} onClickPrevious={setPrevMonth} />
				<h1 className='p-3 text-3xl '>
					records
				</h1>
			</div>
			<Main>
				{
					!records ? <div className='p-3'><SkeletonCard /></div> : records?.length > 0 ? records.map(record => (
						<div key={"records" + record.id} className='block m-6 p-3 bg-white shadow rounded'>
							<Link to={'/records/' + record.id}><h2 className='p-3 text-xl underline decoration-blue-300'>{record.title}</h2></Link>
							<p className='px-6 text-slate-800' >{record.description}</p>
							<Comments commentable={record} loginUser={user} update={update} />
						</div>
					)) : <div className='text-center'>no data found</div>
				}
				<FloatingActionButton icon={<FiPlus />} onClick={() => setShow(true)} />
				<Dialog show={show} close={() => setShow(false)}>{user && <RecordEditModal user={user} close={() => setShow(false)} />}</Dialog>
			</Main>
		</>
	);
}

