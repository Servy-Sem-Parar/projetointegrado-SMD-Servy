interface IValidateInputsProps {
    entity: Record<string, unknown>,
    validations: Record<string, string[]>,
}

interface IValidateInputs {
    success: boolean,
    errors: Record<string, string>
}

export function validateAllInputs(props: IValidateInputsProps) {
    const validationResult: IValidateInputs = {
        success: true,
        errors: {}
    }
    Object.keys(props.validations).forEach(key=>{
        props.validations[key].forEach(validation=>{
            if(validation === "mandatory") {
                if(!validateMandatory(props.entity[key] as string)) {
                    validationResult.success = false;
                    validationResult.errors[key] = "Campo obrigatório";
                }
            }
        })
    })
    return validationResult;
}

export function validateInput(field: string, validations: string[]) {
    let error = "";
    validations.forEach(validation=>{
        if(validation === "mandatory") {
            if(!validateMandatory(field)) {
                error = "Campo obrigatório";
            }
        }
    })
    return error.length > 0 ? error : null;
}

export function validateMandatory(field: string) {
    if(!field || field.length <= 0) {
        return false;
    } else {
        return true;
    }
}