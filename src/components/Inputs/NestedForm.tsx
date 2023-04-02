import DynamicList from './DynamicList';
import * as React from 'react';
import type {
	F,FormModel,DataModel, DataObj
} from './commonTypes';
import TextInput from '@/components/Inputs/TextInput';
import SelectInput from '@/components/Inputs/SelectInput';
import InputLabel from '@/components/Inputs/InputLabel';
import Button from '@/components/Buttons/Button';
export type Attr<N extends number = 1> =
	| F
	| {
		type: 'nested-iterable';
		name: string;
		label?: React.ReactNode;
		defaultValue: DataModel<FormModel<N>,N>[];
		unit: N;
		model: FormModel<N>;
	}
	| {
		type: 'nested';
		name: string;
		label?: React.ReactNode;
		unit: N;
		defaultValue: DataModel<FormModel<N>,N>;
		model: FormModel<N>;
	};
export {DataModel};
type OnClick<T extends object> = (data: { [key in keyof T]: T[key] },functions?:{setData:(name:string,value:unknown)=>void, clear:()=>void}) => any;

type Property<T extends Attr<N>[], N extends number> = {
	properties: T;
	level?: number;
	primaryAction?: { label: React.ReactNode, onClick: OnClick<{[key in T[number]["name"]]:T[number]["defaultValue"]}> };
	secondaryAction?: { label: React.ReactNode, onClick: OnClick<T> };
	deleteAction?: { label: React.ReactNode, onClick: OnClick<T> };
	cancelAction?: { label: React.ReactNode, onClick: OnClick<T> };
}
export default function NestedForm<T extends Attr<N>[],N extends number >({ properties, primaryAction, secondaryAction, deleteAction, cancelAction, level=0 } : Property<T,N>) {
	function initialize(properties:T){
		return properties.reduce((acc, curr) => {
			if (curr.type === 'nested-iterable') {
				return {
					...acc,
					[curr.name]: curr.defaultValue ?? [
						curr.model.reduce((_acc, _curr) => {
							return { ..._acc, [_curr.name]: _curr.defaultValue };
							// @ts-ignore-next-line
						}, {}),
					] as unknown as [{ [key: string]: string | boolean }],
				};
			} else if (curr.type === 'nested') {
				return {
					...acc,
					[curr.name]: curr.defaultValue ?? curr.model.reduce((_acc, _curr) => {
						return { ..._acc, [_curr.name]: _curr.defaultValue };
						// @ts-ignore-next-line
					}, {}) as unknown as { [key: string]: string | boolean },
				};
			} else {
				return { ...acc, [curr.name]: curr.defaultValue };
			}
			// @ts-ignore-next-line
		}, {}) as {
			[key in keyof T[number]]: T[number][key];
		}
	}
	const [data, _setData] = React.useState(()=>initialize(properties));
	function setData<M extends number>(
		key: T[M]['name'],
		value: unknown, // FIXME
	) {
		console.log({ data });
		_setData({ ...data, [key]: value });
	}

	function handleChange<Elm extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
		event: React.ChangeEvent<Elm>
	) {
		if (event.target.type === 'checkbox' && 'checked' in event.target) {
			setData(event.target.name, event.target.checked);
		} else if (event.target.type !== 'nested-iterable') {
			setData(event.target.name, event.target.value);
		}
	}
	return (
		<form onSubmit={(e) => {e.preventDefault();primaryAction?.onClick(data)}} className={`flex ${level === 0 ? "flex-col gap-4" : "flex-row"}`} >
			{properties.map((prop, i) =>
				prop.type === 'hidden' ? (
					<></> // no need to show data because the value is already set
				) : (
					<div key={'input_' + prop.name} className={`mt-4 flex flex-col relative`}>
						<InputLabel forInput={prop.name} label={prop.label ?? ''} />
						{(() => {
							if (prop.type === 'select') {
								return (
									<SelectInput
										type='select'
										name={prop.name}
										className="w-full"
										value={prop.defaultValue}
										options={prop.options}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleChange(e)
										}
									/>
								);
							} else if (prop.type === 'nested-iterable' && prop.name in data) {
								return (
									<div className="m-2 ml-4"><DynamicList
										formModel={prop.model}
										data={data[prop.name]}
										setData={(_value) => {
											const value =
												typeof _value == 'function'
													? _value(data[prop.name])
													: _value;
											setData(prop.name, value);
										}}
										unit={prop.unit}
									/></div>
								);
							} else if (prop.type === 'nested') {
								return (
									<div className="m-2 ml-4"><NestedForm properties={prop.model} level={level + 1} /></div>
								);
							} else {
								return (
									<TextInput
										className="w-full"
										type={prop.type}
										name={prop.name}
										value={data[prop.name]}
										onChange={handleChange}
									/>
								);
							}
						})()}
						{/* <InputError message={errors.email} className="mt-2" /> */}
					</div>
				)
			)}
			<div className='flex flex-row gap-4 justify-end'>
			{deleteAction && (
				<div className="flex items-center justify-end mt-4">
					<Button color='danger' onClick={(e)=>{e.preventDefault();deleteAction.onClick(data,{setData,clear:()=>_setData(initialize(properties))})}} >{deleteAction.label}</Button>
				</div>
			)}
			{cancelAction && (
				<div className="flex items-center justify-end mt-4">
					<Button color='secondary' onClick={(e)=>{e.preventDefault();cancelAction.onClick(data,{setData,clear:()=>_setData(initialize(properties))})}}>{cancelAction.label}</Button>
				</div>
			)}
			{secondaryAction && (
				<div className="flex items-center justify-end mt-4">
					<Button color='secondary' onClick={(e)=>{e.preventDefault();secondaryAction.onClick(data,{setData,clear:()=>_setData(initialize(properties))})}}>{secondaryAction.label}</Button>
				</div>
			)}
			{primaryAction && (
				<div className="flex items-center justify-end mt-4">
					<Button color='primary' onClick={(e)=>{e.preventDefault();primaryAction.onClick(data,{setData,clear:()=>_setData(initialize(properties))})}}>{primaryAction.label}</Button>
				</div>
			)}
			</div>
		</form>
	);
}
