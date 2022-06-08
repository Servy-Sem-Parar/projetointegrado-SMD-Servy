import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date)=>void;
    setFieldValidation: (field: string, value: string)=>void;
    isEdit: boolean;
    passwordValue?: string,
}

export const fieldValidations = {
    name: ["mandatory"],
    role: ["mandatory"],
    password: ["mandatory", "password"],
    retypePassword: ["mandatory", "matchValue"]
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
            onChange: (value: string | Date)=>{
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
                {label: "Admin", value: "admin"},
                {label: "Professora", value: "teacher"},
            ],
            onChange: (value: string | Date)=>{
                props.onChange("role", value)
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
                onChange: (value: string | Date)=>{
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
                onChange: (value: string | Date)=>{
                    props.onChange("retypePassword", value)
                }
            }
        )
    }
    return fields;
    
}