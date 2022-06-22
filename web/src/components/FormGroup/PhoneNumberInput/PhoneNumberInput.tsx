import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "./PhoneNumberInput.css"
import 'react-phone-input-2/lib/style.css'
import { validateInput } from "../../../Tools/validateInputs";

interface IPhoneNumberInputProps {
    id: string,
    defaultValue?: string,
    onChange?: (value: string | Date)=>void,
    validations?: string[],
    setFieldValidation?: (field: string, value: string)=>void,
    errorMessage?: string,
    disabled?: boolean
}

export function PhoneNumberInput(props: IPhoneNumberInputProps) {
    const [phone, setPhone] = useState("");

    useEffect(()=>{
        if(props.defaultValue) {
            setPhone(props.defaultValue);
        }
    }, [props.defaultValue])

    return (
        <PhoneInput
            inputClass={`form_group_phone ${props.errorMessage && "is-invalid-field"}`}
            country={'br'}
            value={phone}
            disabled={props.disabled}
            onChange={(phone)=>{
                setPhone(phone);
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(phone, props.validations as string[]);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError as string)
                        }
                    }
                    props.onChange(phone);
                }
            }}
        />
    )
}