// import type { Tuple } from '@/utiltype';

export interface InputAttr<T> {
	type: T,
	name: string,
	label?: React.ReactNode,
	defaultValue?: T extends 'checkbox' ? boolean : string,
	required?: boolean,
	attributes?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>,
}
export type Primitive = string | number | boolean;

export type F = Readonly<InputAttr<InputType> | SelectAttr | CheckboxAttr | TextareaAttr | NestedAttr | NestedIterableAttr>;

export type Readable<T> = T | Readonly<T>;
export type FormModel<N> = N extends 1 ? Readonly<[F]> : N extends 2 ? Readonly<[F, F]> : N extends 3 ? Readonly<[F, F, F]> : N extends 4 ? Readonly<[F, F, F, F]> : N extends 5 ? Readonly<[F, F, F, F, F]> : N extends 6 ? Readonly<[F, F, F, F, F, F]> : N extends 7 ? Readonly<[F, F, F, F, F, F, F]> : N extends 8 ? Readonly<[F, F, F, F, F, F, F, F]> : N extends 9 ? Readonly<[F, F, F, F, F, F, F, F, F]> : unknown;
// export type FormModel<N extends number=1|2|3|4|5|6|7|8|9> = Tuple<F,N>;
// type D<T extends Readonly<{"name":string,'type':'a'}[]>> =DataObj<T[number]>

// const test=[{name:"hi",type:'a'},{name:"2",'type':'a'},{"name":"3",'type':'a'}] as const;
// function fn( b:D<typeof test>){
// b[2]
// }

// export type DataModel<FM extends Readonly<F[]>> = DataObj<FM[number]>;
// export type DataModel<FM extends Readonly<FormModel<N>>, N extends number > = N extends 1
// 	? DataObj<FM[0]>
// 	: N extends 2
// 	? DataObj<FM[0]> & DataObj<FM[1]>
// 	: N extends 3
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]>
// 	: N extends 4
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]>
// 	: N extends 5
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]>
// 	// :never;
// 	: N extends 6
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]>
// 	: N extends 7
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]>
// 	: N extends 8
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]> & DataObj<FM[7]>
// 	: N extends 9
// 	? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]> & DataObj<FM[7]> & DataObj<FM[8]>
// 	: DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]> & DataObj<FM[7]> & DataObj<FM[8]> & DataObj<FM[number]>
// 	;

type Increment<N> =N extends 0?1:N extends 1?2:N extends 2?3:N extends 3?4:N extends 4?5:N extends 5?6:N extends 6?7:N extends 7?8:N extends 8?9:9;
export type DataModel<FM extends Readonly<FormModel<N>>, N extends number,M extends 0|1|2|3|4|5|6|7|8|9=0 >
	= M extends N
	? DataObj<FM[M]>
	: DataObj<FM[M]> & DataModel<FM,N, Increment<M>>;
// すみませんだめです
export type DataObj<K extends F> = {
	[name in K['name']]: K extends CheckboxAttr
		? boolean
		: K extends NestedAttr<infer N>
		? DataModel<K['model'],N>
		: K extends NestedIterableAttr<infer N>
		? Readonly<DataModel<K['model'],N>[]>
		: string;
};
export type NestedAttr<N extends number = number> = {
	type: 'nested';
	name: string;
	label?: React.ReactNode;
	defaultValue?: Readonly<DataModel<FormModel<N>,N>>;
	model: Readonly<FormModel<N>>;
};
export type NestedIterableAttr<N extends number=number> = {
	type: 'nested-iterable';
	name: string;
	label?: React.ReactNode;
	defaultValue?: Readonly<DataModel<FormModel<N>,N>[]>;
	model: Readonly<FormModel<N>>;
};

export type TextareaAttr = InputAttr<'textarea'>;
export interface TextareaParam<T extends WithId<DataObj<{ name: U, type: 'textarea'; }>>, U extends keyof T & string> {
	field: TextareaAttr,
	item: T,
	handleChange: (id: string | number, name: keyof T & string, value: string) => void;
}
export type CheckboxAttr = InputAttr<'checkbox'>;
export interface CheckboxParam<T extends WithId<DataObj<{ name: U, type: 'checkbox'; }>>, U extends keyof T & string> {
	field: CheckboxAttr,
	item: T,
	handleChange: (id: string | number, name: U, value: boolean) => void;
}

export type SelectAttr = InputAttr<'select'> & { options: Readonly<Readonly<[label: string, value: string]>[]>; };
export interface SelectParam<T extends WithId<DataObj<{ name: U, type: 'select'; options:any[] }>>, U extends keyof T & string> {
	field: SelectAttr,
	item: T,
	handleChange: (id: string | number, name: U, value: string) => void;
}

export interface InputParam<T extends WithId<DataObj<{ name: U, type: InputType; }>>, U extends keyof T & string> {
	field: InputAttr<InputType>,
	item: T,
	handleChange: (id: string | number, name: U, value: string) => void;
}




export type WithId<T extends object> = T & { id: number | string; };
export type InputType = "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "tel" | "text" | "time" | "url" | "week";
