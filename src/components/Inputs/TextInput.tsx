import type { ChangeEvent } from 'react';
export type InputType="checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "tel" | "text" | "time" | "url" | "week";

interface Param{
    type : InputType,
    name:string,
    id?:string,
    value:string|number,
    className:string,
    // autoComplete?:"name"|"honorific-prefix"|"given-name"|"additional-name"|"family-name"|"honorific-suffix"|"nickname"|"organization-title"|"username"|"new-password"|"current-password"|"one-time-code"|"organization"|"street-address"|"address-line1"|"address-line2"|"address-line3"|"address-level4"|"address-level3"|"address-level2"|"address-level1"|"country"|"country-name"|"postal-code"|"cc-name"|"cc-given-name"|"cc-additional-name"|"cc-family-name"|"cc-number"|"cc-exp"|"cc-exp-month"|"cc-exp-year"|"cc-csc"|"cc-type"|"transaction-currency"|"transaction-amount"|"language"|"bday"|"bday-day"|"bday-month"|"bday-year"|"sex"|"url"|"photo"|"tel"|"tel-country-code"|"tel-national"|"tel-area-code"|"tel-local"|"tel-local-prefix"|"tel-local-suffix"|"tel-extension"|"email"|"impp",
    required?:boolean,
    handleChange:(event:ChangeEvent<HTMLInputElement>)=>any
}

export default function TextInput(
    { type = 'text', name, id, value, className,  required=false, handleChange }:Param,
) {
    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id??name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1  ` +
                    className
                }
                required={required}
                onChange={(e) => handleChange(e)}
            />
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
