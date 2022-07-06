interface IValidateInputsProps {
    entity: Record<string, unknown>,
    validations: Record<string, string[]>,
    matchValue?: string;
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
            } else if(validation === "password") {
                if(!validatePassword(props.entity[key] as string)) {
                    validationResult.success = false;
                    validationResult.errors[key] = "A senha deve ter ao menos 8 digitos";
                }
            } else if(validation === "matchValue") {
                if(!validateRetypePassword(props.entity[key] as string, props.matchValue)) {
                    validationResult.success = false;
                    validationResult.errors[key] = "As Senhas não coincidem";
                }
            } else if(validation === "mandatoryArray") {
                if(!validateMandatoryArray(props.entity[key] as string[])) {
                    validationResult.success = false;
                    validationResult.errors[key] = "Selecione ao menos uma opção";
                }
            } else if(validation === "date") {
                if(!validateDate(props.entity[key] as string)) {
                    validationResult.success = false;
                    validationResult.errors[key] = "Data inválida";
                }
            }
        })
    })
    return validationResult;
}

export function validateInput(field: string | string[], validations: string[], matchValue?: string) {
    let error = "";
    validations.forEach(validation=>{
        if(validation === "mandatory") {
            if(!validateMandatory(field as string)) {
                error = "Campo obrigatório";
            }
        } else if(validation === "password") {
            if(!validatePassword(field as string)) {
                error = "A senha deve ter ao menos 8 digitos";
            }
        } else if(validation === "matchValue") {
            if(!validateRetypePassword(field as string, matchValue)) {
                error = "As Senhas não coincidem";
            }
        } else if(validation === "mandatoryArray") {
            if(!validateMandatoryArray(field as string[])) {
                error = "Selecione ao menos uma opção";
            }
        } else if(validation === "date") {
            if(!validateDate(field as string)) {
                error = "Data inválida";
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

export function validatePassword(field: string) {
    if(!field || field.length < 8) {
        return false;
    } else {
        return true;
    }
}

export function validateRetypePassword(field: string, matchValue?: string) {
    if(!field || field !== matchValue) {
        return false;
    } else {
        return true;
    }
}

export function validateMandatoryArray(field: string[]) {
    if(!field || field.length < 1) {
        return false;
    } else {
        return true;
    }
}

export function validateDate(field: string) {
    if(!field || field.length < 10) {
        return false;
    } else {
        return true;
    }
}