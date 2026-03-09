import { type FormField } from '../types/formType'
export const formConfig: FormField[] = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter your name',
        required: true,
        validation: {
            requiredMessage: 'Name is required!',
        },
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
        validation: {
            requiredMessage: 'Email is required!',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            patternMessage: 'Enter a valid email address!',
        },
    },
    {
        label: 'Age',
        name: 'age',
        type: 'number',
        placeholder: 'Enter your age',
        required: true,
        validation: {
            requiredMessage: 'Age is required!',
            min: 1,
            minMessage: 'Age must be greater than 0!',
        },
    }
]