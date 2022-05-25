import "./FormGroup.css"

export type inputTypes = 'text' | 'select' | 'password';
export type inputSizes = '33' | '66' | '50' | '100';

interface IFormGroupProps {
    type: inputTypes,
    size: inputSizes,
    label: string,
    placeholder: string,
    id: string,
    defaultValue?: string,
}

function _generateInput(props: IFormGroupProps) {
    let input;

    switch(props.type) {
        case 'text':
            input = _generateTextInput(props)
            break;
        case 'password':
            input = _generateTextInput(props)
            break;
        default:
            break;
    }

    return input;
}

function _generateTextInput(props: IFormGroupProps) {
    return (
        <input className="form-control-input" defaultValue={props.defaultValue} id={props.id} placeholder={props.placeholder} type={props.type} />
    )
}

function FormGroup(props: IFormGroupProps) {
    return (
        <div className={`size-${props.size}`}>
            <label className="input-label">{props.label}</label>
            {_generateInput(props)}
        </div>
    )
}

export default FormGroup;