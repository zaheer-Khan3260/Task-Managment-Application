import React, { useId, forwardRef } from 'react';

export interface InputSchema {
    label: string;
    type: string;
    placeholder?: string;
    className?: string;
    [key: string]: any;  // allows any additional props to be passed down to the input element
}

const Input = forwardRef<HTMLInputElement, InputSchema>(function Input({
    label,
    type,
    placeholder,
    className = '',  // default to an empty string if className is not provided
    ...rest
}, ref) {
    const id = useId();
    return (
        <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                className={`shadow-xl appearance-none border rounded-xl w-[95%] h-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
                id={id}
                type={type}
                placeholder={placeholder}
                ref={ref}
                {...rest}  // spread the rest of the props to the input element
            />
        </div>
    );
});

export default Input;
