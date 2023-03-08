interface Param{
    forInput: string;
    label: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}
import type React from 'react';
export default function InputLabel({ forInput, label, className, children }:Param) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
            {label}
            { children}
        </label>
    );
}
