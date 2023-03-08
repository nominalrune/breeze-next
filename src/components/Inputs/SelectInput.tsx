// import { forwardRef, useEffect, useRef } from 'react';
interface Param {
	name: string,
	id?: string,
	value: string,
	className: string,
	autoComplete?: "name"|"honorific-prefix"|"given-name"|"additional-name"|"family-name"|"honorific-suffix"|"nickname"|"organization-title"|"username"|"new-password"|"current-password"|"one-time-code"|"organization"|"street-address"|"address-line1"|"address-line2"|"address-line3"|"address-level4"|"address-level3"|"address-level2"|"address-level1"|"country"|"country-name"|"postal-code"|"cc-name"|"cc-given-name"|"cc-additional-name"|"cc-family-name"|"cc-number"|"cc-exp"|"cc-exp-month"|"cc-exp-year"|"cc-csc"|"cc-type"|"transaction-currency"|"transaction-amount"|"language"|"bday"|"bday-day"|"bday-month"|"bday-year"|"sex"|"url"|"photo"|"tel"|"tel-country-code"|"tel-national"|"tel-area-code"|"tel-local"|"tel-local-prefix"|"tel-local-suffix"|"tel-extension"|"email"|"impp",
	required?: boolean,
	options: [label:string | number,value?:string|number][],
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => any;
}
export default function SelectInput(
	{ name, id, value, className, options,autoComplete, required=false, handleChange }: Param
) {

	return (
		<div className="flex flex-col items-start">
			<select
				name={name}
				id={id??name}
				value={value}
				className={
					`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
					className
				}
				required={required}
				autoComplete={autoComplete}
				onChange={(e) => handleChange(e)}
			>
				{options.map(([label, value]) => (
					<option value={value?.toString() ?? label} key={label}>{label}</option>
				))}
			</select>
		</div>
	);
};

// export default forwardRef(function SelectInput(
// 	{ type = 'text', name, id, value, className, options, required, isFocused, handleChange },
// 	ref
// ) {
// 	const input = ref ? ref : useRef();

// 	useEffect(() => {
// 		if (isFocused) {
// 			input.current.focus();
// 		}
// 	}, []);

// 	return (
// 		<div className="flex flex-col items-start">
// 			<select
// 				type={type}
// 				name={name}
// 				id={id}
// 				value={value}
// 				className={
// 					`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
// 					className
// 				}
// 				ref={input}
// 				required={required}
// 				onChange={(e) => handleChange(e)}
// 			>
// 				{options.map(([label, value],i) => (
// 					<option value={value ?? label} key={label+"_"+i}>{label}</option>
// 				))}
// 			</select>
// 		</div>
// 	);
// });
