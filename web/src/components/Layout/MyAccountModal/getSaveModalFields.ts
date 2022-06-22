import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    ableToEdit?: boolean;
}

export const fieldValidations = {
    name: ["mandatory"],
    email: ["mandatory"],
    phone_number: [],
    address: [],
    schoolType: ["mandatory"]
}

export function getSaveModalFields(props: IGetSaveModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "name",
            label: "Nome completo",
            type: "text",
            disabled: !props.ableToEdit,
            defaultValue: props.initialEntity && props.initialEntity.name ? props.initialEntity.name as string : "",
            errorMessage: props.errorMessages && props.errorMessages.name ? props.errorMessages.name : "",
            validations: fieldValidations.name && fieldValidations.name,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("name", value)
            }
        },
        {
            id: "email",
            label: "Email",
            type: "text",
            disabled: !props.ableToEdit,
            defaultValue: props.initialEntity && props.initialEntity.email ? props.initialEntity.email as string : "",
            errorMessage: props.errorMessages && props.errorMessages.email ? props.errorMessages.email : "",
            validations: fieldValidations.email && fieldValidations.email,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("email", value)
            }
        },
        {
            id: "phone_number",
            label: "Telefone",
            type: "phone_number",
            disabled: !props.ableToEdit,
            defaultValue: props.initialEntity && props.initialEntity.phone_number ? props.initialEntity.phone_number as string : "",
            errorMessage: props.errorMessages && props.errorMessages.phone_number ? props.errorMessages.phone_number : "",
            validations: fieldValidations.phone_number && fieldValidations.phone_number,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("phone_number", value)
            }
        },
        {
            id: "schoolType",
            label: "Tipo de escola",
            type: "select",
            disabled: !props.ableToEdit,
            defaultValue: props.initialEntity && props.initialEntity.schoolType ? props.initialEntity.schoolType as string : "",
            errorMessage: props.errorMessages && props.errorMessages.schoolType ? props.errorMessages.schoolType : "",
            validations: fieldValidations.schoolType && fieldValidations.schoolType,
            placeholder: "Selecione o tipo de escola",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: [
                {label: "Pública", value: "public"},
                {label: "Particular", value: "private"},
            ],
            onChange: (value: string | Date | string[])=>{
                props.onChange("schoolType", value)
            }
        },
        {
            id: "address",
            label: "Endereço",
            type: "text",
            disabled: !props.ableToEdit,
            defaultValue: props.initialEntity && props.initialEntity.address ? props.initialEntity.address as string : "",
            errorMessage: props.errorMessages && props.errorMessages.address ? props.errorMessages.address : "",
            validations: fieldValidations.address && fieldValidations.address,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("address", value)
            }
        },      
    ]

    return fields;
    
}