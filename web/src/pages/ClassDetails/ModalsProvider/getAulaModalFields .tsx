import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetAulaModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    disabled: boolean;
}

export const aulasFieldValidations = {
    title: ["mandatory"],
    description: [],
    hour: ["mandatory"],
    date: ["mandatory"],
    duration: ["mandatory"],
    link: ["mandatory"],
}

export function getAulaModalFields(props: IGetAulaModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "title",
            label: "Título",
            type: "text",
            disabled: props.disabled,
            defaultValue: props.initialEntity && props.initialEntity.title ? props.initialEntity.title as string : "",
            errorMessage: props.errorMessages && props.errorMessages.title ? props.errorMessages.title : "",
            validations: aulasFieldValidations.title && aulasFieldValidations.title,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("title", value);
            }
        },   
        {
            id: "description",
            label: "Descrição",
            type: "text",
            disabled: props.disabled,
            defaultValue: props.initialEntity && props.initialEntity.description ? props.initialEntity.description as string : "",
            errorMessage: props.errorMessages && props.errorMessages.description ? props.errorMessages.description : "",
            validations: aulasFieldValidations.description && aulasFieldValidations.description,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("description", value);
            }
        },  
        {
            id: "date",
            label: "Data",
            type: "date",
            disabled: props.disabled,
            defaultValue: props.initialEntity && props.initialEntity.date ? props.initialEntity.date as string : "",
            errorMessage: props.errorMessages && props.errorMessages.date ? props.errorMessages.date : "",
            validations: aulasFieldValidations.date && aulasFieldValidations.date,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("date", value)
            }
        },
        {
            id: "hour",
            label: "Horário",
            type: "time",
            disabled: props.disabled,
            defaultValue: props.initialEntity && props.initialEntity.hour ? props.initialEntity.hour as string : "",
            errorMessage: props.errorMessages && props.errorMessages.hour ? props.errorMessages.hour : "",
            validations: aulasFieldValidations.hour && aulasFieldValidations.hour,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("hour", value);
            }
        }, 
        {
            id: "duration",
            label: "Duração",
            type: "number",
            disabled: props.disabled,
            defaultValue: props.initialEntity && props.initialEntity.duration ? props.initialEntity.duration as string : "",
            errorMessage: props.errorMessages && props.errorMessages.duration ? props.errorMessages.duration : "",
            validations: aulasFieldValidations.title && aulasFieldValidations.duration,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("duration", value);
            }
        },  
        {
            id: "link",
            label: "Link de acesso",
            type: "text",
            disabled: props.disabled,
            defaultValue: props.initialEntity && props.initialEntity.link ? props.initialEntity.link as string : "",
            errorMessage: props.errorMessages && props.errorMessages.link ? props.errorMessages.link : "",
            validations: aulasFieldValidations.link && aulasFieldValidations.link,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("link", value);
            }
        },  
    ]

    return fields;
}