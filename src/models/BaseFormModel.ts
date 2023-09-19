import NestedForm from '@/components/Inputs/NestedForm';
import React from 'react';

export default class BaseFormModel<T> {
	private defaultValues:T;
	private currentValues:T;
	private errors;
	private validators;
	private validatorsAsync;
	public toFormData: () => any;
	public submit: () => Promise<any>;
	public getView(): ()=>React.ReactNode{
		return ()=>NestedForm();
	}
}
