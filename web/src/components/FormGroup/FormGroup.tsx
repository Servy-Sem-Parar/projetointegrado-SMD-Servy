import { validateInput } from "../../Tools/validateInputs";
import "./FormGroup.css"
import { PhoneNumberInput } from "./PhoneNumberInput/PhoneNumberInput";
import Select, { StylesConfig } from 'react-select';
import { GithubPicker } from 'react-color';

export type inputTypes = 'text' | 'select' | 'password' | "phone_number" | "multiSelect" | "iconSelect" | "color";
export type inputSizes = '33' | '66' | '50' | '100';

export interface IFormGroupProps {
    type: inputTypes,
    size: inputSizes,
    label?: string,
    placeholder: string,
    id: string,
    defaultValue?: string | Record<string, string>[] | Date,
    onChange?: (value: string | Date | string[])=>void,
    validations?: string[],
    errorMessage?: string,
    setFieldValidation?: (field: string, value: string)=>void,
    matchValue?: string;
    options?: {
        label: string | JSX.Element,
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
        case 'phone_number':
            input = _generatePhoneInput(props)
            break;
        case 'multiSelect':
            input = _generateMultiSelectInput(props)
            break;
        case 'iconSelect':
            input = _generateIconSelectInput(props)
            break;
        case 'color':
            input = _generateColorInput(props)
            break;
        default:
            break;
    }

    return input;
}

function _generateColorInput(props: IFormGroupProps) {
    return (
        <GithubPicker
            onChangeComplete={(value)=>{
                const color = value.hex as string;
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(color, props.validations as string[]);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(color);
                }
            }}
            colors={["#8FDEC6", "#FEA47F", "#F9844A", "#B33771", "#6D214F", "#25CCF7", "#1B9CFC", "#1982C4", "#3B3B98", "#182C61", "#EAB543", "#1E1E1E", "#FD7272", "#FC427B", "#55E6C1", "#58B19F", "#9AECDB", "#FFCA3A", "#CAD3C8", "#2C3A47", "#D6A2E8", "#D6A2E8", "#82589F", "#41DBAC", "#80C754", "#F8961E"]}
            
        />
    )
}

function _generateMultiSelectInput(props: IFormGroupProps) {
    return (
        <Select
            options={props.options}
            isMulti={true}
            id={props.id}
            placeholder={props.placeholder}
            styles={{
                valueContainer: styles => ({
                    alignItems: "center",
                    display: "flex",
                    padding: "0px 7px",
                    width: "100%",
                    flexWrap: "wrap",
                }),
                multiValue: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                
                option: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                input: styles =>({
                    ...styles,
                    fontSize: "15px",
                    caretColor: "transparent"
                }),
                placeholder: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                noOptionsMessage: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                control: styles => ({ 
                    display:"flex",
                    borderRadius: "10px",
                    border: "1px solid #F97E0D",
                    marginTop: "4px",
                }),
            } as StylesConfig}
            defaultValue={props.defaultValue as unknown as string[]}
            onChange={(selectedOptionsValues)=>{
                const selectedOptions = selectedOptionsValues as unknown as Record<string, string>[]
                if(props.onChange) {
                    const value = selectedOptions.map(option=>{
                        return option.value as string
                    })
                    if(props.validations) {
                        const validationError = validateInput(value, props.validations as string[], props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(value);
                }
            }}
        />
    )
}

function _generatePhoneInput(props: IFormGroupProps) {
    return (
        <PhoneNumberInput
            id={props.id}
            defaultValue={props.defaultValue as string}
            onChange={props.onChange}
            validations={props.validations}
            setFieldValidation={props.setFieldValidation}
            errorMessage={props.errorMessage}
        />
    )
}

function _generateTextInput(props: IFormGroupProps) {
    return (
        <input 
            className={`form-control-input ${props.errorMessage && "is-invalid-field"}`}
            onChange={(event)=>{
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(event.target.value, props.validations as string[], props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(event.target.value);
                }
            }} 
            defaultValue={props.defaultValue as string} 
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
            defaultValue={props.defaultValue as string}
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

function _generateIconSelectInput(props: IFormGroupProps) {
    return (
        <Select
            options={props.options}
            id={props.id}
            placeholder={props.placeholder}
            styles={{
                valueContainer: styles => ({
                    alignItems: "center",
                    display: "flex",
                    padding: "0px 7px",
                    width: "100%",
                }),
                singleValue: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                option: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                input: styles =>({
                    ...styles,
                    fontSize: "15px",
                    caretColor: "transparent"
                }),
                placeholder: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                noOptionsMessage: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                control: styles => ({ 
                    display:"flex",
                    borderRadius: "10px",
                    border: "1px solid #F97E0D",
                    marginTop: "4px",
                }),
                
            } as StylesConfig}
            defaultValue={props.defaultValue as string}
            onChange={(selectedOptionValue)=>{
                const selectedOption = selectedOptionValue as Record<string, string>;
                if(props.onChange) {
                    const value = selectedOption.value;
                    if(props.validations) {
                        const validationError = validateInput(value, props.validations as string[], props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(value);
                }
            }}
        />
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