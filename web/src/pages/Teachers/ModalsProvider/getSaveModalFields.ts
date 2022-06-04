interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date)=>void;
    setFieldValidation: (field: string, value: string)=>void;
}

export const fieldValidations = {
    name: ["mandatory"],
    role: ["mandatory"],
}

export function getSaveModalFields(props: IGetSaveModalFieldsProps) {
    return (
        [
            {
                id: "name",
                label: "Nome",
                type: "text",
                defaultValue: props.initialEntity && props.initialEntity.name ? props.initialEntity.name : "",
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
                defaultValue: props.initialEntity && props.initialEntity.role ? props.initialEntity.role : "",
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
            }
        ]
    )
}