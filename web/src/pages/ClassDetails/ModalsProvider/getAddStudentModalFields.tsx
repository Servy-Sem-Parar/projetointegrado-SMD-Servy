import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetAddStudentModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    students: Record<string, unknown>[];
}

export function getAddStudentModalFields(props: IGetAddStudentModalFieldsProps) {
    const fields: IFormGroupProps[] = [
        {
            id: "students",
            label: "Alunas",
            type: "multiSelect",
            defaultValue: [],
            errorMessage: props.errorMessages && props.errorMessages.students ? props.errorMessages.students : "",
            validations: [],
            placeholder: "Selecione uma ou mais alunas",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: props.students as {label: string, value: string}[],
            onChange: (value: string | Date | string[])=>{
                props.onChange("students", value)
            }
        },       
    ]

    return fields;
}