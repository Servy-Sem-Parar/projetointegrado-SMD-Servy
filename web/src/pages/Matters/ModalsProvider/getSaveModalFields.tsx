import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
}

export const fieldValidations = {
    name: ["mandatory"],
    description: [],
    icon: []
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
            id: "description",
            label: "Descrição",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.description ? props.initialEntity.description as string : "",
            errorMessage: props.errorMessages && props.errorMessages.description ? props.errorMessages.description : "",
            validations: fieldValidations.description && fieldValidations.description,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("description", value);
            }
        },       
    ]

    return fields;
}