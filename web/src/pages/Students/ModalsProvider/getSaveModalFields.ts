import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    isEdit: boolean;
    passwordValue?: string,
    turmas: Record<string, unknown>[]
}

export const fieldValidations = {
    name: ["mandatory"],
    password: ["password", "mandatory"],
    retypePassword: ["matchValue", "mandatory"],
    email: ["mandatory"],
    phone_number: [],
    turmas: [],
    address: ["mandatory"],
    schoolType: ["mandatory"],
    birthDate: ["mandatory"]
}

export function getSaveModalFields(props: IGetSaveModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "name",
            label: "Nome completo",
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
            id: "birthDate",
            label: "Data de nascimento",
            type: "date",
            defaultValue: props.initialEntity && props.initialEntity.birthDate ? props.initialEntity.birthDate as string : "",
            errorMessage: props.errorMessages && props.errorMessages.birthDate ? props.errorMessages.birthDate : "",
            validations: fieldValidations.birthDate && fieldValidations.birthDate,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("birthDate", value)
            }
        },
        {
            id: "turmas",
            label: "Turmas",
            type: "multiSelect",
            defaultValue: props.initialEntity && props.initialEntity.turmasDefaultValue ? props.initialEntity.turmasDefaultValue as string : "",
            errorMessage: props.errorMessages && props.errorMessages.turmas ? props.errorMessages.turmas : "",
            validations: fieldValidations.turmas && fieldValidations.turmas,
            placeholder: "Selecione uma ou mais turmas",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: props.turmas as {label: string, value: string}[],
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
        {
            id: "schoolType",
            label: "Tipo de escola",
            type: "select",
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

    //if(props.isEdit === false) {
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
    //}
    return fields;
    
}