import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./DateInput.css";
import "react-datepicker/dist/react-datepicker.css";
import { validateInput } from "../../../Tools/validateInputs";
import { formatDateToSendAlt } from "../../../Tools/formatDateToSend";
import { registerLocale } from  "react-datepicker";
import br from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', br)

interface IDateInputProps {
    id: string,
    defaultValue?: string,
    onChange?: (value: string | Date)=>void,
    validations?: string[],
    setFieldValidation?: (field: string, value: string)=>void,
    errorMessage?: string,
    disabled?: boolean
}

export function DateInput(props: IDateInputProps) {
    const [date, setDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

    useEffect(()=>{
        if(props.defaultValue) {
            const defaultDate = props.defaultValue;
            const date = new Date(parseInt(defaultDate.substr(0,4)), parseInt(defaultDate.substr(5,2))-1, parseInt(defaultDate.substr(8,2)) )
            setDate(date);
        }
    }, [props.defaultValue])

    return (
        <DatePicker
            className={`form-control-input ${props.errorMessage && "is-invalid-field"}`}
            selected={date}
            locale="pt-BR"
            dateFormat={"dd/MM/yyyy"}
            disabled={props.disabled}
            onChange={(date)=>{
                if(date) {
                    const dateString = formatDateToSendAlt(date.getFullYear(), date.getMonth()+1, date.getDate(), "00:00:00")
                    setDate(date);
                    if(props.onChange) {
                        if(props.validations) {
                            const validationError = validateInput(dateString, props.validations as string[]);
                            if(props.setFieldValidation){
                                props.setFieldValidation(props.id, validationError as string)
                            }
                        }
                        props.onChange(dateString);
                    }
                }
            }}
        />
    )
}