interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
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
                placeholder: "",
                size: "100"
            }
        ]
    )
}