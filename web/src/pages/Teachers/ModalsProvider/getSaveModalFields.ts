import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    isEdit: boolean;
    passwordValue?: string,
}

export const fieldValidations = {
    name: ["mandatory"],
    role: ["mandatory"],
    password: ["password", "mandatory"],
    retypePassword: ["matchValue", "mandatory"],
    email: ["mandatory"],
    phone_number: [],
    turmas: []
}

export function getSaveModalFields(props: IGetSaveModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "name",
            label: "Nome",
            type: "text",
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
            id: "role",
            label: "Permissão",
            type: "select",
            defaultValue: props.initialEntity && props.initialEntity.role ? props.initialEntity.role as string : "",
            errorMessage: props.errorMessages && props.errorMessages.role ? props.errorMessages.role : "",
            validations: fieldValidations.role && fieldValidations.role,
            placeholder: "Selecione uma permissão",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: [
                {label: "Administradora", value: "admin"},
                {label: "Professora", value: "teacher"},
            ],
            onChange: (value: string | Date | string[])=>{
                props.onChange("role", value)
            }
        }, 
        {
            id: "turmas",
            label: "Turmas",
            type: "multiSelect",
            defaultValue: props.initialEntity && props.initialEntity.turmas ? props.initialEntity.turmas as string : "",
            errorMessage: props.errorMessages && props.errorMessages.turmas ? props.errorMessages.turmas : "",
            validations: fieldValidations.turmas && fieldValidations.turmas,
            placeholder: "Selecione uma ou mais turmas",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: [
                {label: "Administradora", value: "admin"},
                {label: "Professora", value: "teacher"},
            ],
            onChange: (value: string | Date | string[])=>{
                props.onChange("turmas", value)
            }
        }, 
        {
            id: "email",
            label: "Email",
            type: "text",
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
               
    ]

    if(props.isEdit === false) {
        fields.push(
            {
                id: "password",
                label: "Senha",
                type: "password",
                defaultValue: "",
                errorMessage: props.errorMessages && props.errorMessages.password ? props.errorMessages.password : "",
                validations: fieldValidations.password && fieldValidations.password,
                placeholder: "",
                size: "100",
                setFieldValidation: props.setFieldValidation,
                onChange: (value: string | Date | string[])=>{
                    props.onChange("password", value)
                }
            }
        )
        fields.push(
            {
                id: "retypePassword",
                label: "Repita a senha",
                type: "password",
                defaultValue: "",
                errorMessage: props.errorMessages && props.errorMessages.retypePassword ? props.errorMessages.retypePassword : "",
                validations: fieldValidations.retypePassword && fieldValidations.retypePassword,
                placeholder: "",
                size: "100",
                setFieldValidation: props.setFieldValidation,
                matchValue: props.passwordValue && props.passwordValue,
                onChange: (value: string | Date | string[])=>{
                    props.onChange("retypePassword", value)
                }
            }
        )
    }
    return fields;
    
}