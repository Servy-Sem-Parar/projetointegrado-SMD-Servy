import FormGroup, { IFormGroupProps, inputSizes, inputTypes } from "../FormGroup/FormGroup";
import "./SaveModal.css";

interface ISaveModalProps {
    titleLabel: string;
    showModal: boolean;
    closeModal: ()=>void;
    targetEntity: Record<string, unknown>;
    fields: IFormGroupProps[];//Record<string, unknown>[];
    footerButtons: {
        callback: ()=>void;
        label: string;
    }[]
}

export function SaveModal(props: ISaveModalProps) {
    return (
        <div 
            className="save-modal-blur"
            style={{
                display: props.showModal ? "flex" : "none",
            }}
        >
            <div className="save-modal">
                <div className="save-modal-header">
                    <div className="save-modal-title">{props.titleLabel}</div>
                    <div className="save-modal-close-icon" onClick={()=>{props.closeModal()}}>x</div>
                </div>
                <div className="save-modal-body">
                    {
                        props.fields.map((field)=>{
                            return (
                                <FormGroup
                                    type={field.type as inputTypes}
                                    size={field.size as inputSizes}
                                    label={field.label as string}
                                    placeholder={field.placeholder as string}
                                    id={field.id as string}
                                    defaultValue={field.defaultValue as string}
                                    onChange={field.onChange as (value: string | string[] | Date)=>void}
                                    options={field.options as {value: string, label: string}[]}
                                    validations={field.validations as string[]}
                                    errorMessage={field.errorMessage as string}
                                    setFieldValidation={field.setFieldValidation as (field: string, value: string)=>void}
                                    matchValue={field.matchValue as string}
                                />
                            )
                        })
                    }
                </div>
                <div className="save-modal-footer">
                    <div className="save-modal-footer-buttons-container">
                        {
                            props.footerButtons.map(button=>{
                                return (
                                    <button className="save-modal-footer-button" onClick={()=>{button.callback()}}>{button.label}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}