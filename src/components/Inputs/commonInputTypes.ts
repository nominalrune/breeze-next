// import type { Tuple } from '@/utiltype';

export interface InputAttr<T> {
	type: T,
	name: string,
	label?: React.ReactNode,
	defaultValue?: Primitive,
	required?: boolean,
	attributes?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>,
}
export type Primitive = string | number | boolean;

export type F = Readonly<InputAttr<InputType> | SelectAttr | CheckboxAttr | TextareaAttr | NestedAttr<F[]> | NestedIterableAttr<F[]>>;

//export type Readable<T> = T | Readonly<T>;
//export type FormModel<N> = N extends 1 ? Readonly<[F]> : N extends 2 ? Readonly<[F, F]> : N extends 3 ? Readonly<[F, F, F]> : N extends 4 ? Readonly<[F, F, F, F]> : N extends 5 ? Readonly<[F, F, F, F, F]> : N extends 6 ? Readonly<[F, F, F, F, F, F]> : N extends 7 ? Readonly<[F, F, F, F, F, F, F]> : N extends 8 ? Readonly<[F, F, F, F, F, F, F, F]> : N extends 9 ? Readonly<[F, F, F, F, F, F, F, F, F]> : unknown;


//type Increment<N> =N extends 0?1:N extends 1?2:N extends 2?3:N extends 3?4:N extends 4?5:N extends 5?6:N extends 6?7:N extends 7?8:N extends 8?9:9;

// export type DataModel<FM extends Readonly<FormModel<N>>, N extends number,M extends 0|1|2|3|4|5|6|7|8|9=0 >
// 	= M extends N
// 	? DataObj<FM[M]>
// 	: DataObj<FM[M]> & DataModel<FM,N, Increment<M>>;
// すみませんだめです

export type DataObj<K extends Readonly<F[]>> = {
	[name in K[number]['name']]: DataType<K[number]>;
};


export type DataItem<K extends Readonly<F>> = {
	[name in K['name']]: DataType<K>
};
export type DataType<K extends F|Readonly<F>> =
	K extends CheckboxAttr
	? boolean
	: K extends NestedAttr<infer N>
	? DataObj<N>
	: K extends NestedIterableAttr<infer N>
	? DataObj<N>[]
	: K extends InputAttr<"color" | "date" | "datetime-local" | "email" | "file" | "image" | "month" | "password" | "radio" | "range" | "tel" | "text" | "time" | "url" | "week">
	? string
	: string | number;
export type NestedAttr<T extends Readonly<F[]>> = {
	type: 'nested';
	name: string;
	label?: React.ReactNode;
	defaultValue?: Readonly<DataObj<T>>;
	model: T;
};
export type NestedIterableAttr<T extends Readonly<F[]>> = {
	type: 'nested-iterable';
	name: string;
	label?: React.ReactNode;
	defaultValue?: Readonly<DataObj<T>>;
	model: T;
};

export type TextareaAttr = InputAttr<'textarea'>;
export interface TextareaParam<T extends WithId<DataItem<{ name: U, type: 'textarea'; }>>, U extends keyof T & string> {
	field: TextareaAttr,
	item: T,
	handleChange: (id: string | number, name: keyof T & string, value: string) => void;
}
export type CheckboxAttr = InputAttr<'checkbox'>;
export interface CheckboxParam<T extends WithId<DataItem<{ name: U, type: 'checkbox'; }>>, U extends keyof T & string> {
	field: CheckboxAttr,
	item: T,
	handleChange: (id: string | number, name: U, value: boolean) => void;
}

export type SelectAttr = InputAttr<'select'> & { options: Readonly<Readonly<[label: string, value: string]>[]>; };
export interface SelectParam<T extends WithId<DataItem<{ name: U, type: 'select'; options: any[]; }>>, U extends keyof T & string> {
	field: SelectAttr,
	item: T,
	handleChange: (id: string | number, name: U, value: string | number) => void;
}

export interface InputParam<T extends WithId<DataItem<{ name: U, type: InputType; }>>, U extends keyof T & string> {
	field: InputAttr<InputType>,
	item: T,
	handleChange: (id: string | number, name: U, value: string | number) => void;
}




export type WithId<T extends object> = T & { id: number | string; };
export type InputType = "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "tel" | "text" | "time" | "url" | "week";
