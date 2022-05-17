import "./styles.css"

interface IFormGroupProps {
    type: 'text' | 'select',
    size: '33' | '66' | '50' | '100',
    label: string,
    placeholder: string,
    id: string,
}

function _generateInput(props: {type: string, placeholder: string, id: string}) {
    let input;

    switch(props.type) {
        case 'text':
            input = _generateTextInput(props.placeholder, props.id)
            break;
        default:
            break;
    }

    return input;
}

function _generateTextInput(placeholder: string, id: string) {
    return (
        <input className="form-control-input" id={id} placeholder={placeholder} type={"text"} />
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