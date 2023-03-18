import InputLabel from './InputLabel';
import PrimaryButton from '../Buttons/PrimaryButton';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useState, DetailedHTMLProps, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
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
		handleSecondAction: (p?: ActionParams) => any;
	};
	cancel?: {
		label: React.ReactNode,
		handleCancel?: (p?: ActionParams) => any;
	};
};
export type Property = {
	propName: string,
	label?: React.ReactNode,
	defaultValue: string | number | boolean,
	className?: string,
	required?: boolean,
	placeholder?: string;
} & (
		{
			type: "select",
			options: [
				label: string,
				value: string | number
			][],
			attributes?: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
		} | {
			type: "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "tel" | "text" | "time" | "url" | "week",
			attributes?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
		} | {
			type: "textarea", attributes?: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
		}
	);
type ActionParams = {
	data: {
		[key: string]: any;
	},
	setData: (p:any) => void,
	submit: (method: Method, url: string, options?: any) => void,
	processing: boolean,
	errors: any,
	reset: () => void;
};

export default function EditForm({ method, route, properties, urlParams, submitLabel, secondAction, cancel, handleSuccess }: Params) {
	const [data, _setData] = useState<{ [key: Property["propName"]]: Property["defaultValue"]; }>(
		properties.reduce(
			(acc, cur) => ({ ...acc, [cur.propName]: cur.defaultValue ?? "" }),
			{})
	);
	const [processing, setProcessing] = useState(false);
	function setData(propName: Property["propName"], value: Property["defaultValue"]) {
		_setData({ ...data, [propName]: value });
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		// console.log({ data });
		setData(
			event.target.name,
			(event.target.type === 'checkbox' && 'checked' in event.target
				? event.target.checked
				: event.target.value?.toString())
		);
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const url = route + (urlParams ?? ""); // FIXME
		setProcessing(true);
		axios({ method, url, data }).then(res => {
			setProcessing(false);
			console.log("responce: ", res);
			handleSuccess && handleSuccess(res);
		}).finally(() => {
			setProcessing(false);
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			{
				properties.map((prop) => prop.type === "hidden"
					? <div key={"input_" + prop.propName}></div> // no need to show data because the value is already set
					: (
						<div key={"input_" + prop.propName} className="mt-4">
							<InputLabel forInput={prop.propName} label={prop.label ?? prop.propName} />
							{
								(prop.type === "select")
									?
									<SelectInput
										name={prop.propName}
										value={data[prop.propName].toString()??""}
										className={
											prop.className ?? ""
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
											{...prop.attributes}
											type={prop.type}
											name={prop.propName}
											value={data[prop.propName].toString()}
											className={prop.className ?? ""}
											handleChange={handleChange}
										/>
							}
							{/* <InputError message={errors.email} className="mt-2" /> */}
						</div>
					))
			}
			<div className="flex items-center justify-end mt-4">
				{cancel && (<SecondaryButton className="ml-4" onClick={cancel.handleCancel}>{cancel.label}</SecondaryButton>)}
				{secondAction && (<SecondaryButton onClick={() => secondAction.handleSecondAction({ data, setData, submit, errors, processing, reset })} className="ml-4">{secondAction.label}</SecondaryButton>)}
				<PrimaryButton className="ml-4" processing={processing}>
					{submitLabel}
				</PrimaryButton>
			</div>
		</form>
	);
}
