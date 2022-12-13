import { INPUTTYPES } from 'constants/inputFields.constant';
import { InputFieldProps } from 'models/types';


const InputField = (props: InputFieldProps) => {
    const { field,
        form,
        type= 'text',
        label= '',
        placeholder= '',
        disabled= false,
        required= false,
        checked = false, } = props
    const { name, value, onChange, onBlur } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    return (
        <>
            {type === INPUTTYPES.CHECKBOX
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
                : type === INPUTTYPES.RADIO
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