import { IFormGroupProps } from "../../../components/FormGroup/FormGroup";

interface IGetSaveModalFieldsProps {
    initialEntity: Record<string, unknown>;
    errorMessages: Record<string, string>;
    onChange: (field: string, value: string | Date | string[])=>void;
    setFieldValidation: (field: string, value: string)=>void;
    disciplinas: Record<string, unknown>[];
    teachers: Record<string, unknown>[];
    students: Record<string, unknown>[];
}

export const fieldValidations = {
    name: ["mandatory"],
    level: ["mandatory"],
    description: [],
    informations: [],
    disciplina: ["mandatory"],
    color: ["mandatory"],
    teachers: [],
    students: [],
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
            id: "level",
            label: "Nível",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.level ? props.initialEntity.level as string : "",
            errorMessage: props.errorMessages && props.errorMessages.level ? props.errorMessages.level : "",
            validations: fieldValidations.level && fieldValidations.level,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("level", value);
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
        {
            id: "informations",
            label: "Informações adicionais",
            type: "text",
            defaultValue: props.initialEntity && props.initialEntity.informations ? props.initialEntity.informations as string : "",
            errorMessage: props.errorMessages && props.errorMessages.informations ? props.errorMessages.informations : "",
            validations: fieldValidations.informations && fieldValidations.informations,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("informations", value);
            }
        }, 
        {
            id: "disciplina",
            label: "Disciplina",
            type: "select",
            defaultValue: props.initialEntity && props.initialEntity.disciplinaDefaultValue ? props.initialEntity.disciplinaDefaultValue as string : "",
            errorMessage: props.errorMessages && props.errorMessages.disciplina ? props.errorMessages.disciplina : "",
            validations: fieldValidations.disciplina && fieldValidations.disciplina,
            placeholder: "Selecione uma disciplina",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: props.disciplinas as {label: string, value: string}[],
            onChange: (value: string | Date | string[])=>{
                props.onChange("disciplina", value)
            }
        },
        {
            id: "teachers",
            label: "Professoras",
            type: "multiSelect",
            defaultValue: props.initialEntity && props.initialEntity.teachersDefaultValue ? props.initialEntity.teachersDefaultValue as Record<string, string>[] : [],
            errorMessage: props.errorMessages && props.errorMessages.teachers ? props.errorMessages.teachers : "",
            validations: fieldValidations.teachers && fieldValidations.teachers,
            placeholder: "Selecione uma ou mais professoras",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: props.teachers as {label: string, value: string}[],
            onChange: (value: string | Date | string[])=>{
                props.onChange("teachers", value)
            }
        },
        {
            id: "students",
            label: "Alunas",
            type: "multiSelect",
            defaultValue: props.initialEntity && props.initialEntity.studentsDefaultValue ? props.initialEntity.studentsDefaultValue as Record<string, string>[] : [],
            errorMessage: props.errorMessages && props.errorMessages.students ? props.errorMessages.students : "",
            validations: fieldValidations.students && fieldValidations.students,
            placeholder: "Selecione uma ou mais alunas",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            options: props.students as {label: string, value: string}[],
            onChange: (value: string | Date | string[])=>{
                props.onChange("students", value)
            }
        },
        {
            id: "color",
            label: "Cor",
            type: "color",
            defaultValue: props.initialEntity && props.initialEntity.color ? props.initialEntity.color as string : "",
            errorMessage: props.errorMessages && props.errorMessages.color ? props.errorMessages.color : "",
            validations: fieldValidations.color && fieldValidations.color,
            placeholder: "",
            size: "100",
            setFieldValidation: props.setFieldValidation,
            onChange: (value: string | Date | string[])=>{
                props.onChange("color", value);
            }
        },
    ]

    return fields;
}