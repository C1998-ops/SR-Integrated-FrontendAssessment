import type { ChangeEvent, FocusEvent } from 'react';

export type FormFieldType =
	| 'text'
	| 'email'
	| 'password'
	| 'number';

// Config used to describe each field in the form
export interface FormField {
	name: string;
	label: string | React.ReactNode;
	group?: string; // For grouping fields together
	type: FormFieldType;
	placeholder?: string;
	required?: boolean;
	validation?: {
		requiredMessage?: string;
		pattern?: RegExp;
		patternMessage?: string;
		min?: number;
		minMessage?: string;
	};
}

// Props passed to the actual input component
export interface FormInputProps {
	label?: string | React.ReactNode;
	name?: string;
	group?: string; // For grouping fields together
	type: FormFieldType;
	placeholder?: string;
	required?: boolean;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	formErrors?: string | null;
	className?: string;
	disable?: boolean;
	[key: string]: any;
}