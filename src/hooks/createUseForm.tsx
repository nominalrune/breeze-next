interface UseFormParams<T> {
	form:any;
	defaultValues: T;
	validations?: {[key in keyof T]: (value: T[key]) => string | boolean};
	onSubmit: (values: T) => any;
	onSuccess?: () => void;
	onError?: (error:unknown) => any;
}
export default function createUseForm({}) {}
