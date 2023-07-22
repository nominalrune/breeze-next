import { RecordDTO } from '@/models/Record';
import { useState } from 'react';
import NestedForm from '../Inputs/NestedForm';
import { UserDTO } from '@/models/User';
import { RecordCreateDTO } from '@/models/Record';
import { api } from '@/lib/axios';
interface Props {
	record?: RecordDTO | RecordCreateDTO,
	user: UserDTO,
	close: () => void,
	onSuccess?: (record: RecordDTO) => void,
}
export default function RecordEditModal({ record, user, close, onSuccess }: Props) {
	function handleSubmit(item: RecordCreateDTO | Omit<RecordDTO, 'created_at' | 'updated_at'>) {
		if ('id' in item && item.id) {
			return api().put(`/records/${item.id}`, item).then((res) => {
				close();
				onSuccess && onSuccess(res.data);
			});
		} else {
			return api().post(`/records`, item).then((res) => {
				close();
				onSuccess && onSuccess(res.data);
			});
		}
	}
	return <div className='bg-white rounded-md'><NestedForm
		properties={getProps(user, record)}
		primaryAction={{ label: 'Save', onClick: (item) => handleSubmit(item as RecordCreateDTO | Omit<RecordDTO, 'created_at' | 'updated_at'>) }}
		cancelAction={{ label: 'Cancel', onClick: () => new Promise(() => close()) }}
	/></div>;
}

function getProps(user: UserDTO, data: RecordDTO | Omit<RecordCreateDTO, "user_id"> = { title: '', description: '', date: new Date().toISOString().split('T')[0], time: 0 }) {
	return [
		{
			name: "id",
			type: "hidden",
			defaultValue: 'id' in data ? data.id : '',
		},
		{
			name: "title",
			label: "title",
			type: "text",
			defaultValue: data.title,
		},
		{
			name: "description",
			label: "description",
			type: "textarea",
			defaultValue: data.description,
		},
		{
			name: "user_id",
			type: "hidden",
			defaultValue: user.id,
		},
		{
			name: "date",
			label: "date",
			type: "date",
			defaultValue: data.date,
		},
		{
			name: "time",
			label: "time",
			type: "number",
			defaultValue: data.time,
		},
		{
			name: "recordable_type",
			label: "type",
			type: "select",
			defaultValue: data?.recordable_type,
			options: [
				['none', undefined],
				['Task', 'Task'],
				['CalendarEvent', 'CalendarEvent']
			],
		},
		{
			name: "recordable_id",
			label: "recordable_id",
			type: "select",
			defaultValue: data?.recordable_id,
			options: [['none', undefined]],
		}
	] as const;
}
