import React, { useEffect, useState } from 'react';
import { formConfig } from '../config/formConfig';
import type { FormField } from '../types/formType';
import { FormInput } from './CustomFormInput';

// Simple key/value map for the form data
export type FormValues = Record<string, string>;

interface StudentFormProps {
	initialValues?: FormValues;
	onSubmit: (values: FormValues) => void;
	onCancel: () => void;
	loading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
	initialValues,
	onSubmit,
	onCancel,
	loading = false,
}) => {
	const [studentFormData, setStudentFormData] = useState<FormValues>(initialValues ?? {});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	// console.log(studentFormData);

	useEffect(() => {
		setStudentFormData(initialValues ?? {});
		setFormErrors({});
	}, [initialValues]);

	const validateField = (field: FormField, value: string) => {
		const trimmedValue = value.trim();

		if (field.required && !trimmedValue) {
			return field.validation?.requiredMessage ?? `${field.label} is required!`;
		}

		if (field.validation?.pattern && trimmedValue && !field.validation.pattern.test(trimmedValue)) {
			return field.validation.patternMessage ?? `Enter a valid ${field.name}!`;
		}

		if (field.type === 'number' && trimmedValue) {
			const numericValue = Number(trimmedValue);
			if (Number.isNaN(numericValue)) {
				return `${field.label} must be a valid number!`;
			}
			if (
				field.validation?.min !== undefined &&
				numericValue < field.validation.min
			) {
				return field.validation.minMessage ?? `${field.label} must be at least ${field.validation.min}!`;
			}
		}

		return '';
	};

	const validateForm = (values: FormValues) => {
		const nextErrors: Record<string, string> = {};

		formConfig.forEach((field) => {
			const error = validateField(field, values[field.name] ?? '');
			if (error) {
				nextErrors[field.name] = error;
			}
		});

		return nextErrors;
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setStudentFormData(prevData => ({
			...prevData,
			[name]: value,
		}));

		setFormErrors((prevErrors) => {
			if (!prevErrors[name]) return prevErrors;

			const nextErrors = { ...prevErrors };
			delete nextErrors[name];
			return nextErrors;
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const nextErrors = validateForm(studentFormData);
		setFormErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		onSubmit(studentFormData);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const field = formConfig.find((configField) => configField.name === name);

		if (!field) return;

		const error = validateField(field, value);
		setFormErrors((prevErrors) => {
			if (!error) {
				const nextErrors = { ...prevErrors };
				delete nextErrors[name];
				return nextErrors;
			}

			return {
				...prevErrors,
				[name]: error,
			};
		});
	};

	return (
		<form
			className="flex h-auto w-full max-w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
			onSubmit={handleSubmit}
		>
			{/* form config with input fields mapping */}
			{formConfig.map((field: FormField) => (
				<FormInput
					key={field.name}
					{...field}
					value={studentFormData[field.name] ?? ''}
					onChange={handleChange}
					formErrors={formErrors[field.name] ?? null}
					onBlur={handleBlur}
					disable={loading}
				/>
			))}
			<div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
				<button
					type="button"
					className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
					onClick={onCancel}
					disabled={loading}
				>
					Cancel
				</button>
				<button
					type="submit"
					className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
					disabled={loading}
				>
					{loading ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
};

export default StudentForm;