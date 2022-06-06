import { validateInput } from "../../Tools/validateInputs";
import "./FormGroup.css"

export type inputTypes = 'text' | 'select' | 'password';
export type inputSizes = '33' | '66' | '50' | '100';

interface IFormGroupProps {
    type: inputTypes,
    size: inputSizes,
    label: string,
    placeholder: string,
    id: string,
    defaultValue?: string,
    onChange?: (value: string | Date)=>void,
    validations?: string[],
    errorMessage?: string,
    setFieldValidation?: (field: string, value: string)=>void,
    options?: {
        label: string,
        value: string,
    }[]
}

function _generateInput(props: IFormGroupProps) {
    let input;

    switch(props.type) {
        case 'text':
            input = _generateTextInput(props)
            break;
        case 'password':
            input = _generateTextInput(props)
            break;
        case 'select':
            input = _generateSelectInput(props)
            break;
        default:
            break;
    }

    return input;
}

function _generateTextInput(props: IFormGroupProps) {
    return (
        <input 
            className={`form-control-input ${props.errorMessage && "is-invalid-field"}`}
            onChange={(event)=>{
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(event.target.value, props.validations as string[]);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(event.target.value);
                }
            }} 
            defaultValue={props.defaultValue} 
            id={props.id} 
            placeholder={props.placeholder} 
            type={props.type} 
        />
    )
}

function _generateSelectInput(props: IFormGroupProps) {
    return (
        <select
            placeholder={props.placeholder}
            className={`form-control-input ${props.errorMessage && "is-invalid-field"}`}
            defaultValue={props.defaultValue}
            onChange={(event)=>{
                if(props.onChange) {
                    if(props.validations) {
                        console.log("ene", event.target.value)
                        const validationError = validateInput(event.target.value, props.validations as string[]);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(event.target.value);
                }
            }} 
            id={props.id} 
        >
            <option value={""} disabled hidden>{props.placeholder}</option>
                {
                    props.options && props.options.map((option)=>{
                        return(
                            <option value={option.value}>{option.label}</option>
                        )
                    })
                }
            </select>
    )
}

function FormGroup(props: IFormGroupProps) {
    return (
        <div className={`size-${props.size}`}>
            <label className="input-label">{props.label}</label>
            {_generateInput(props)}
            <div className="is-invalid-label">{props.errorMessage}</div>
        </div>
    )
}

export default FormGroup;