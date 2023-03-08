import InputLabel from './InputLabel';
import PrimaryButton from '../Buttons/PrimaryButton';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useState } from 'react';
import { axios, csrf } from 'lib/useAxios';
import type { Method, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { InputType } from './TextInput';
export type Params = {
	method: Method,
	route: string,
	urlParams?: object,
	properties: Property[],
	submitLabel: React.ReactNode,
	handleSuccess?: (res: AxiosResponse) => any,
	secondAction?: {
		label: React.ReactNode,
		// handleSecondAction: (p?: ActionParams) => any;
	};
	cancel?: {
		label: React.ReactNode,
		// handleCancel: (p?: ActionParams) => any;
	};
};
export type Property = {
	propName: string,
	label?: React.ReactNode,
	value: string|number|boolean,
	className?: string,
	attributes?: [{ [key: string]: string | number; }],
	type: InputType,
	options?: [
		label: string | number,
		value?: string | number,
	][];
};
type ActionParams = {
	data: {
		[key: string]: any;
	},
	setData: () => void,
	submit: (method: Method, url: string, options?: any) => void,
	processing: boolean,
	errors: any,
	reset: () => void;
};

export default function EditForm({ method, route, properties, urlParams, submitLabel, secondAction, cancel, handleSuccess }: Params) {
	const [data, _setData] = useState<{ [key: Property["propName"]]: Property["value"]; }>(
		properties.reduce(
			(acc, cur) => ({ ...acc, [cur.propName]: cur.value ?? "" }),
			{})
	);
	const [processing, setProcessing]=useState(false);
	function setData(propName: Property["propName"], value: Property["value"]) {
		_setData({ ...data, [propName]: value });
	}


	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		console.log({ data });
		setData(
			event.target.name,
			(event.target.type === 'checkbox' && 'checked' in event.target
				? event.target.checked
				: event.target.value?.toString())
		);
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const url = route + (urlParams??""); // FIXME
		setProcessing(true);
		axios({ method, url, data }).then(res => {
			setProcessing(false);
			console.log("responce: ",res);
			handleSuccess && handleSuccess(res);
		}).finally(()=>{
			setProcessing(false);
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			{
				properties.map((prop) => prop.type === "hidden"
					? <div key={"input_" + prop.propName}></div>
					: (
						<div key={"input_" + prop.propName} className="mt-4">
							<InputLabel forInput={prop.propName} label={prop.label??prop.propName} />
							{
								(prop.type === "select" && prop.options)
									?
									<SelectInput
										name={prop.propName}
										value={data[prop.propName].toString()}
										className={
											`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ` +
											prop.className
										}
										options={prop.options}
										handleChange={handleChange}
										{...prop.attributes}
									/>
									: (prop.type === "textarea")
										?
										<textarea
											name={prop.propName}
											value={data[prop.propName].toString()}
											className={
												`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ` +
												prop.className
											}
											onChange={handleChange}
											{...prop.attributes}
										/>
										: <TextInput
											type={prop.type}
											name={prop.propName}
											value={data[prop.propName].toString()}
											className={
												`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ` +
												prop.className
											}
											handleChange={handleChange}
											{...prop.attributes}
										/>
							}
							{/* <InputError message={errors.email} className="mt-2" /> */}
						</div>
					))
			}
			<div className="flex items-center justify-end mt-4">
				{/* {cancel && (<SecondaryButton className="ml-4" onClick={cancel.handleCancel}>{cancel.label}</SecondaryButton>)} */}
				{/* {secondAction && (<SecondaryButton onClick={() => secondAction.handleSecondAction({ data, setData, submit, errors, processing, reset })} className="ml-4">{secondAction.label}</SecondaryButton>)} */}
				<PrimaryButton className="ml-4" processing={processing}>
					{submitLabel}
				</PrimaryButton>
			</div>
		</form>
	);
}
