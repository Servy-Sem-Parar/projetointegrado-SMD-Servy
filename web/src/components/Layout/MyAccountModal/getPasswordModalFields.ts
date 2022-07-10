import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    passwordValue?: string,
}

export const passwordFieldValidations = {
    oldPassword: ["password", "mandatory"],
    newPassword: ["password", "mandatory"],
    retypePassword: ["matchValue", "mandatory"],
}

export function getPasswordModalFields(props: IGetSaveModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "oldPassword",
            label: "Senha",
            type: "password",
            defaultValue: "",
            errorMessage: props.errorMessages && props.errorMessages.password ? props.errorMessages.password : "",
            validations: passwordFieldValidations.oldPassword && passwordFieldValidations.oldPassword,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("oldPassword", value)
            }
        },
        {
            id: "newPassword",
            label: "Nova senha",
            type: "password",
            defaultValue: "",
            errorMessage: props.errorMessages && props.errorMessages.newPassword ? props.errorMessages.newPassword : "",
            validations: passwordFieldValidations.newPassword && passwordFieldValidations.newPassword,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("newPassword", value)
            }
        },
        {
            id: "retypePassword",
            label: "Repita a senha",
            type: "password",
            defaultValue: "",
            errorMessage: props.errorMessages && props.errorMessages.retypePassword ? props.errorMessages.retypePassword : "",
            validations: passwordFieldValidations.retypePassword && passwordFieldValidations.retypePassword,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            matchValue: props.passwordValue && props.passwordValue,
            onChange: (value: string | Date | string[])=>{
                props.onChange("retypePassword", value)
            }
        }
    ]

    return fields;
}