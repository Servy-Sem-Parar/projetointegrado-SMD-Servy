import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";
import { getIconOptions } from "../../../Tools/getIconOptions";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
}

export const fieldValidations = {
    name: ["mandatory"],
    icon: ["mandatory"]
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
                props.onChange("name", value);
            }
        },
        {
            id: "icon",
            label: "Ícone",
            type: "iconSelect",
            defaultValue: props.initialEntity && props.initialEntity.icon ? props.initialEntity.icon as string : "",
            errorMessage: props.errorMessages && props.errorMessages.icon ? props.errorMessages.icon : "",
            validations: fieldValidations.icon && fieldValidations.icon,
            placeholder: "Selecione um ícone",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: getIconOptions(),
            onChange: (value: string | Date | string[])=>{
                props.onChange("icon", value)
            }
        },        
    ]

    return fields;
}