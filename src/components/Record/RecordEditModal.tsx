import {RecordDTO} from '@/models/Record';
import { useState } from 'react';
import NestedForm from '../Inputs/NestedForm';
import { User } from '@/models/User';
import { RecordCreateDTO } from '@/models/Record';

export default function RecordEditModal({record, user}:{record?:RecordDTO|RecordCreateDTO, user:User}){
	return  <NestedForm properties={getProps(user, record)} />
}

function getProps(user:User, data:RecordDTO|Omit<RecordCreateDTO,"user_id"> ={title:'',description:'',date:new Date().toISOString().split('T')[0],time:0}){
	return [
		{
			name:"id",
			type:"hidden",
			defaultValue:data?.id,
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
	] as const;
}
