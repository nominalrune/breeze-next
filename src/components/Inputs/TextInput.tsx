import type { ChangeEvent } from 'react';
export type InputType = "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "tel" | "text" | "time" | "url" | "week";

type Param<T extends InputType | "textarea"> = { type: T; underlineStyle?: boolean; } & (T extends "textarea" ? TextareaParam : InputParam<T>);

type TextareaParam = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
	outerClassName?: string;
	value: string;
};
type InputParam<T> = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value" | "type"> & {
	outerClassName?: string;
} & (T extends "checkbox" ? {
	value: boolean;
} : T extends "number" ? {
	value: number;
} : {
	value: string;
});

export default function TextInput<T extends InputType | "textarea">(
	{ type, value, className = '', outerClassName = '', underlineStyle, onChange, ...rest }: Param<T>,
) {
	const classString = underlineStyle
		? "block border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 backdrop-blur "
		: "block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 rounded-md shadow-sm ";
	return (
		<div className={"flex flex-col " + outerClassName} >
			{type === "textarea"
				? <textarea
					{...rest}
					value={value as string}
					className={
						classString
						+ `mt-1 block w-full ` +
						className
					}
					onChange={onChange as (event: ChangeEvent<HTMLTextAreaElement>) => any}
					style={{ fontSize: "inherit" }}
				/>
				: type === "number"
					? <input
						{...rest}
						type='number'
						value={+value}
						className={
							classString
							+ className
						}
						style={{ fontSize: "inherit" }}
						onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => any}
					/>
					: type === "checkbox"
						? <input
							{...rest}
							type="checkbox"
							checked={!!value as boolean}
							className={
								classString +
								className ?? "" + " w-5 h-5"
							}
							style={{ fontSize: "inherit" }}
							onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => any}
						/>
						:
						<input
							{...rest}
							type={type}
							value={value as string}
							className={
								classString +
								className
							}
							style={{ fontSize: "inherit" }}
							onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => any}
						/>
			}
		</div>
	);
};

// export default forwardRef<HTMLInputElement,Param>(function TextInput(
//     { type = 'text', name, id, value, className, autoComplete, required, isFocused, handleChange },
//     ref
// ) {
//     const input = ref ? ref : useRef<HTMLInputElement>({value});

//     useEffect(() => {
//         if (isFocused) {
//             input.current.focus();
//         }
//     }, []);

//     return (
//         <div className="flex flex-col items-start">
//             <input
//                 type={type}
//                 name={name}
//                 id={id}
//                 value={value}
//                 className={
//                     `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
//                     className
//                 }
//                 ref={input}
//                 autoComplete={autoComplete}
//                 required={required}
//                 onChange={(e) => handleChange(e)}
//             />
//         </div>
//     );
// });
