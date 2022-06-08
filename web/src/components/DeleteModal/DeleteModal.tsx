import { useState } from "react";
import "./DeleteModal.css";

interface IDeleteModalProps {
    titleLabel: string;
    showModal: boolean;
    closeModal: ()=>void;
    bodyLabel: string;
    callback: ()=>void;
}

export function DeleteModal(props: IDeleteModalProps) {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    return (
        <div 
            className="save-modal-blur"
            style={{
                display: props.showModal ? "flex" : "none",
            }}
        >
            <div className="delete-modal">
                <div className="save-modal-header">
                    <div className="save-modal-title">{props.titleLabel}</div>
                    <div className="save-modal-close-icon" onClick={()=>{props.closeModal()}}>x</div>
                </div>
                <div className="delete-modal-body">
                    <div className="delete_modal_body_label">{props.bodyLabel}</div>
                    <div 
                        className="checkbox-container"
                        onClick={(event)=>{
                            const checkbox = document.getElementById("remove-modal-checkbox") as HTMLInputElement;
                            checkbox.checked = buttonDisabled;
                            setButtonDisabled(!buttonDisabled);
                        }}
                    >
                        <input type="checkbox" id="remove-modal-checkbox"/>
                        <label className="delete-modal-checkbox-label" >Estou ciente</label>
                    </div>
                </div>
                <div className="save-modal-footer">
                    <div className="save-modal-footer-buttons-container">
                        <button className="save-modal-footer-button" onClick={()=>{props.closeModal()}}>Cancelar</button>
                        <button disabled={buttonDisabled} className={buttonDisabled ? "save-modal-footer-button-disabled" : "save-modal-footer-button"} onClick={()=>{props.callback()}}>Remover</button>
                    </div>
                </div>
            </div>
        </div>
    )
}