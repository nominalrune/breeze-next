import DynamicList from './DynamicList';
import * as React from 'react';
import type {
	F, DataModel, DataObj,NestedIterableAttr,NestedAttr, FormModel
} from './commonTypes';
import TextInput from '@/components/Inputs/TextInput';
import SelectInput from '@/components/Inputs/SelectInput';
import InputLabel from '@/components/Inputs/InputLabel';
import Button from '@/components/Buttons/Button';
// export type Attr<N extends number = 1> =F<N>;
export { DataModel,NestedIterableAttr,NestedAttr,FormModel };
type OnClick<T extends object> = (data: { [key in keyof T]: T[key] }, functions?: { clear: () => void; }) => any;
type CountF<T> =T extends FormModel<1>?1:T extends FormModel<2>?2:T extends FormModel<3>?3:T extends FormModel<4>?4:T extends FormModel<5>?5:T extends FormModel<6>?6:T extends FormModel<7>?7:T extends FormModel<8>?8:T extends FormModel<9>?9:T extends FormModel<10>?10:T extends FormModel<11>?11:T extends FormModel<12>?12:T extends FormModel<13>?13:T extends FormModel<14>?14:T extends FormModel<15>?15:T extends FormModel<16>?16:T extends FormModel<17>?17:T extends FormModel<18>?18:T extends FormModel<19>?19:T extends FormModel<20>?20:T extends FormModel<21>?21:T extends FormModel<22>?22:T extends FormModel<23>?23:T extends FormModel<24>?24:T extends FormModel<25>?25:T extends FormModel<26>?26:T extends FormModel<27>?27:T extends FormModel<28>?28:T extends FormModel<29>?29:T extends FormModel<30>?30:T extends FormModel<31>?31:T extends FormModel<32>?32:T extends FormModel<33>?33:T extends FormModel<34>?34:T extends FormModel<35>?35:T extends FormModel<36>?36:T extends FormModel<37>?37:T extends FormModel<38>?38:T extends FormModel<39>?39:T extends FormModel<40>?40:T extends FormModel<41>?41:T extends FormModel<42>?42:T extends FormModel<43>?43:44;
type Property<T extends Readonly<FormModel<N>>,N extends number> = {
	properties: T;
	level?: number;
	// primaryAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	// secondaryAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	// deleteAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	// cancelAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	primaryAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	secondaryAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	deleteAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
	cancelAction?: { label: React.ReactNode, onClick: OnClick<DataModel<T>>; };
};
export default function NestedForm<T extends Readonly<FormModel<N>>,N  extends number>({ properties, primaryAction, secondaryAction, deleteAction, cancelAction, level = 0 }: Property<T,N>) {
	function initialize(properties: T) {
		return properties.reduce((acc, curr) => {
			if (curr.type === 'nested-iterable') {
				return {
					...acc,
					[curr.name]: curr.defaultValue ?? [
						curr.model.reduce((_acc, _curr) => {
							return { ..._acc, [_curr.name]: _curr.defaultValue };
							// @ts-ignore-next-line
						}, {}),
					] as unknown as [{ [key: string]: string | boolean; }],
				};
			} else if (curr.type === 'nested') {
				return {
					...acc,
					[curr.name]: curr.defaultValue ?? curr.model.reduce((_acc, _curr) => {
						return { ..._acc, [_curr.name]: _curr.defaultValue };
						// @ts-ignore-next-line
					}, {}) as unknown as { [key: string]: string | boolean; },
				};
			} else {
				return { ...acc, [curr.name]: curr.defaultValue };
			}
			// @ts-ignore-next-line
		}, {}) as {
				[key in keyof T[number]]: T[number][key];
			};
	}
	const [data, _setData] = React.useState(() => initialize(properties));
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
		<form onSubmit={(e) => { e.preventDefault(); primaryAction?.onClick(data); }} className={`flex ${level === 0 ? "flex-col gap-4" : "flex-row"}`} >
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
						<Button color='danger' onClick={(e) => { e.preventDefault(); deleteAction.onClick(data, { clear: () => _setData(initialize(properties)) }); }} >{deleteAction.label}</Button>
					</div>
				)}
				{cancelAction && (
					<div className="flex items-center justify-end mt-4">
						<Button color='secondary' onClick={(e) => { e.preventDefault(); cancelAction.onClick(data, { clear: () => _setData(initialize(properties)) }); }}>{cancelAction.label}</Button>
					</div>
				)}
				{secondaryAction && (
					<div className="flex items-center justify-end mt-4">
						<Button color='secondary' onClick={(e) => { e.preventDefault(); secondaryAction.onClick(data, { clear: () => _setData(initialize(properties)) }); }}>{secondaryAction.label}</Button>
					</div>
				)}
				{primaryAction && (
					<div className="flex items-center justify-end mt-4">
						<Button color='primary' onClick={(e) => { e.preventDefault(); primaryAction.onClick(data, { clear: () => _setData(initialize(properties)) }); }}>{primaryAction.label}</Button>
					</div>
				)}
			</div>
		</form>
	);
}
