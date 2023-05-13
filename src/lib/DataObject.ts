

export class DataObject<T extends object> extends Object {
	public map<U>(callbackFn:(value:[keyof T, T[keyof T]], index: number, array: [string, any][]) => U) : U[] {
		return Object.entries(this).map(callbackFn);
	}
	public select<U extends Partial<T>>(...keys:(keyof T)[]) : U {
		return keys.reduce((acc, key) => ({...acc, key:this[key]}),{}) as U;
	}
	public constructor(obj: T){
		super(obj);
	}
}
