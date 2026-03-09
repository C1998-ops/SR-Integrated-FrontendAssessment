// FormInput.tsx
import React from 'react';
import { type FormInputProps } from '../types/formType';

export const FormInput: React.FC<FormInputProps> = props => {
	const {
		label,
		name,
		type,
		placeholder,
		required,
		value,
		onChange,
		onBlur,
		formErrors,
		className,
		disable = false,
	} = props;

	const inputClassName = `rounded-md border px-3 py-2 text-sm w-full text-gray-700 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${
		formErrors
			? 'border-red-500 focus:border-red-500 focus:ring-red-200'
			: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
	} ${className ?? ''}`;
	return (
		<div className="flex flex-wrap items-center gap-x-2 w-full">
			{typeof label === 'string' ? (
				<label
					htmlFor={name}
					className="inline-block align-middle text-sm text-gray-700 font-medium mb-1"
				>
					{label}
					{label !== '' && required && (
						<span className="text-red-500 font-medium text-xs sm:text-sm">*</span>
					)}
				</label>
			) : (
				label
			)}
			<div className="relative w-full">
				{type === 'number' ? (
					<input type="number" id={name} name={name} placeholder={placeholder} required={required} className={inputClassName} value={value ? value.toString() : ''} onChange={onChange} onBlur={onBlur} disabled={disable} />
				) : (
					<input type={type} id={name} name={name} placeholder={placeholder} required={required} className={inputClassName} value={value ? value.toString() : ''} onChange={onChange} onBlur={onBlur} disabled={disable} />
				)}
			</div>
			{formErrors ? <p className="mt-1 text-xs text-red-600">{formErrors}</p> : null}
		</div>
	);
};
