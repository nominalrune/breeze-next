import NestedForm from '@/components/Inputs/NestedForm';
import { useReducer } from 'react';

export default abstract class BaseFormModel {
	private formModel: FormValue[];
	private currentValues: T;
	private errors;
	private validators;
	abstract toFormData: () => any;
	abstract submit: () => Promise<any>;
	public getView(): () => React.ReactNode {
		return () => <NestedForm  />;
	}
	constructor(defaultValues: T) {
		this.defaultValues = defaultValues;
		this.currentValues = defaultValues;
		this.errors = {};
		this.validators = {};
	}
}

class FormValue<T> {
	type: string;
	defaultValue: T;
	currentValue: T;
	error?: string;
	validate?: (value: T) => undefined | Promise<undefined> | string | Promise<string>;
	get() { return this.currentValue; }
	async set(value: T) {
		const err = this.validate ? await this.validate(value) : undefined;
		if (err) {
			this.error = err;
			return;
		}
		this.currentValue = value;
	}
	constructor(defaultValue: T, validator?: (value: T) => undefined | Promise<undefined> | string | Promise<string>) {
		this.defaultValue = defaultValue;
		this.currentValue = defaultValue;
		this.validate = validator;
	}
}
