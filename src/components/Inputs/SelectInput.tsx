import type { ChangeEvent, } from 'react';
import Select from 'react-select';
export default function SelectInput(
    { name, id, value, className, options, required, isFocused, multiple, handleChange }: {
		 type: string, name: string, id?: string, value?: string|undefined, className?: string, options: [label: string, value: any][], required?: boolean, autoComplete?: string, isFocused?: boolean, multiple?: boolean, handleChange: (e: ChangeEvent<HTMLInputElement>) => any; }
) {
    const _options = options.map(([label, value]) => ({ label, value }));
    return (
        <div className="flex flex-col items-start">
            <Select
                name={name}
                id={id ?? name}
                defaultValue={_options.filter(i => i.value == value)[0]}
                className={className}
                unstyled={true}
                classNames={{
                    control: () =>
                        `bg-white p-2 border-[1px] border-gray-300 outline-2 outline-offset-2 outline-transparent focus-within:border-indigo-500 focus-within:ring-offset-white focus-within:ring-indigo-500 rounded-md shadow-sm mt-1`,
                    input: () => 'opacity-0',
                    option: () => 'py-1 px-2 rounded-sm bg-white hover:bg-indigo-100 focus:bg-indigo-200',
                    menu: () => 'border-[1px] shadow-sm rounded-md m-1',
                    multiValue: () => 'bg-slate-50 border-[1px] shadow-sm rounded-lg px-2 py-[0.1rem] mx-1',
                    multiValueLabel: () => 'text-slate-800',
                    multiValueRemove: () => 'text-slate-600',
                    indicatorsContainer: () => 'text-slate-700',
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        '--tw-ring-shadow': state.isFocused ? 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)' : "0 0 transparent",
                    }),
                }}
                required={required}
                onChange={(e) => {e&&handleChange({ target: {value: e?.length ? e.map(i => i.value) : e?.value ?? e } }); }}
                isMulti={multiple}
                options={_options}
            />
        </div>
    );
};
