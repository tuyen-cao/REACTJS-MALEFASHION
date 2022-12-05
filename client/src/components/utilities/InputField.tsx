import { FieldHookConfig, useField  } from 'formik';
import React from 'react'

const defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    required: false,
    checked: false,
};

type InputFieldProps = {
    field: {
        name: string,
        value: string,
        onChange: () => void,
        onBlur: () => void,
        error: string
    },
    form: {
        errors: any,
        touched: any
    },

    type: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean,
    checked?: boolean,
} & typeof defaultProps

const InputField = (props: InputFieldProps) => {
    const { field,
        form,
        type,
        label,
        placeholder,
        disabled,
        required, checked } = props
    const { name, value, onChange, onBlur } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    return (
        <>
            {type === "checkbox"
                ?
                <>
                    {label && <label htmlFor={name}>{label} {required && <span>*</span>}
                        <input type={type} id={name}
                            {...field}
                            disabled={disabled}
                             />
                        <span className="checkmark" />
                    </label>}
                </>
                : type === "radio"
                    ? <>
                        {label && <label >{label} {required && <span>*</span>}
                            <input type={type}
                                {...field}
                                value={label} />
                            <span className="checkmark" />
                        </label>}

                    </>
                    : <>
                        {label && <label htmlFor={name}>
                            {label} {required && <span>*</span>}
                        </label>}
                        <input
                            id={name}
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required} />
                    </>}
            {showError && <div className="invalid-feedback">{errors[name]}</div>}
        </>
    )
}

export default InputField
InputField.defaultProps = defaultProps;