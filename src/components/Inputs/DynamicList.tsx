import React,{ useState, useMemo} from 'react';
import type { InputAttr,F, Primitive, WithId, DataObj,InputType,InputParam,SelectParam,  TextareaParam, CheckboxParam } from './commonInputTypes';
import TextInput from '@/components/Inputs/TextInput';
import SelectInput from '@/components/Inputs/SelectInput';
import { FiX,FiPlus } from 'react-icons/fi';
import InputLabel from '@/components/Inputs/InputLabel';
import NestedForm from './NestedForm';

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;


interface DynamicListProps<T extends Readonly<F[]>> {
	formModel: T,
	data: DataObj<T>[],
	setData: Setter<DataObj<T>[]>,
}

export default function DynamicList<T extends Readonly<F[]>>({ formModel, data, setData }: DynamicListProps<T>) {
	const [index, setIndex] = useState(0);
	const list = useMemo(()=>data?.map(item=>withId(item)),[data]);

	function withId(initialValue: DataObj<T>):WithId<DataObj<T>>{
		const id = ('id' in initialValue) ? initialValue.id as number|string: index; // NOTE initialValue.id be prioritized over index, overwriting the original id may cause errors
		setIndex((index) => index + 1);
		return { ...initialValue, id };
	}
	function addItem(initialValue: DataObj<T>) {
		console.log("addItem",{initialValue})
		setData([...list, withId(initialValue)]);
	}
	function handleAdd(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		const newItem: DataObj<T> = formModel.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue }),{}) as unknown as DataObj<T>;
		addItem(newItem);
	}
	function handleChange<Name extends keyof WithId<DataObj<T>>>(id: string | number, name:Name, value: Primitive) {
		const newList = list.map(item => (item.id === id ? { ...item, [name]: value } : item));
		setData(newList);
	}
	function handleDelete(id: string | number) {
		const newList = list.filter((item) => item.id !== id);
		setData(newList);
	}
	return (
		<div className='flex flex-col my-3'>
			{list.map((item) => (
				<div key={item.id} className='flex flex-row items-center gap-2 my-4'>
					{formModel.map((field:F) => (
						<div key={field.name} className='relative' ><InputLabel forInput={field.name} label={field.label ?? ''} className='absolute -top-5 text-sm' />
							{
								(() => {
									const attr = { field, item, handleChange } as any; // FIXME
									switch (field.type) {
										case 'hidden': return <></>;
										case 'select': return <SelectInput
											type='select'
											name={field.name}
											options={field.options as [string, string][]}
											value={item[field.name]}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(item.id, field.name, e.target.value)}
										/>;
										case 'checkbox': return <Checkbox {...attr} />;
										case 'textarea': return <Textarea {...attr} />;
										case 'nested-iterable': return <DynamicList formModel={field.model}
										data={item[field.name]}
										setData={
											(_value) => {
											const value =
												typeof _value == 'function'
													? _value(item[field.name])
													: _value;
											handleChange(item.id, field.name, value)
										}
									}
										unit={field.unit} />;
										case 'nested': return <div className="m-2 ml-4"><NestedForm properties={field.model} level={field.level} /></div>;
										default: return <TextInput
											type={field.type}
											name={field.name}
											value={item[field.name]}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(item.id, field.name, e.target.value)}
										 />;
									}
								})()
							}
						</div>
					))}
					<button
			className='h-8 w-8 flex items-center justify-center bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-400'
					onClick={() => handleDelete(item.id)}><FiX/></button>
				</div>
			))}
			<button
			className='m-2 h-12 w-96 flex items-center justify-center border-2 border-slate-400 bg-slate-50 rounded-md hover:border-slate-500 active:border-slate-600'
			onClick={handleAdd}><FiPlus className="text-slate-500 hover:text-slate-600 active:text-slate-700"/></button>
		</div>
	);
}



function Checkbox<T extends WithId<DataObj<{name:U, type:'checkbox'}>>, U extends keyof T & string>({ field, item, handleChange }: CheckboxParam<T, U>) {
	return (
		<>
			<input
				{...field}
			className='h-6 w-6 m-2'
				defaultValue={field.name}
				value={field.name}
				checked={item[field.name]}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(item.id, field.name, e.target.checked)}
			/>
			{field.label && <label htmlFor={field.name}>{field.label}</label>}
		</>
	);
}

function Textarea<T extends WithId<DataObj<{name:U, type:'textarea'}>>, U extends keyof T & string>({ field, item, handleChange }: TextareaParam<T, U>) {
	return (
		<>
			<textarea
			className='border-2 border-slate-300 rounded-md p-1'
				{...field}
				value={item[field.name]}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(item.id, field.name, e.target.value)}
			/>
		</>
	);
}
