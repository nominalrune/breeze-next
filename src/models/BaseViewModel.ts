import { ComponentProps } from 'react';
import BaseModel  from './BaseModel';

export default interface BaseViewModel<T extends BaseModel> {
	model: {
		[key in keyof Omit<T,'kind'|'toFormData'>]: {
			value: T[key],
			label?: React.ReactNode,
			form?: false|{
				type: "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "tel" | "text" | "time" | "url" | "week" | "select" | "textarea" | "checkbox" | "nested" | "nested-iterable",
				defaultValue?: any,
			} & ComponentProps<'input'>,
		};
	};
};
type DateToString<T> = T extends Date | undefined | null ? string : T;
type IncludeTypes<T,U> = T[keyof T] extends U ? {[k in keyof T]:DateToString<T[k]>} : {};
export type BaseFormData<T, Omits extends string='' > = {
[key in keyof Omit<T, 'kind'|'created_at'|'updated_at'|'toFormData'| Omits >]: T[key] extends Date | undefined | null
? string
: T[key];
};
