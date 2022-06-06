import { useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({})
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({})

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            setTargetEntity({...targetEntity}); 
            setEntity({...targetEntity})
        }
        setIsOpenSaveModal(true) 
    }

    return (
        <div>
            {
                isOpenSaveModal && 
                    <SaveModal
                        titleLabel={targetEntity.id ? "Editar Professora" : "Nova Professora"}
                        showModal={isOpenSaveModal}
                        closeModal={()=>{setIsOpenSaveModal(false); setTargetEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getSaveModalFields({
                                initialEntity: targetEntity, 
                                errorMessages, 
                                onChange: (field: string, value: string | Date)=>{
                                    const newEntity = {...entity}
                                    newEntity[field] = value;
                                    setEntity(newEntity)
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...errorMessages};
                                    newValidation[field] = value;
                                    setErrorMessages(newValidation);
                                },
                            })
                        }
                        footerButtons={[
                            {
                                label: "Cancelar",
                                callback: ()=>{
                                    setTargetEntity({});
                                    setEntity({})
                                    setIsOpenSaveModal(false); 
                                    setErrorMessages({});
                                }
                            },
                            {
                                label: "Salvar",
                                callback: ()=>{
                                    const validationResult = validateAllInputs({entity, validations: fieldValidations})
                                    
                                    if(validationResult.success) {
                                        alertSuccess("Usuário criado com sucesso.")
                                        console.log("ent", entity)
                                        setEntity({});
                                        setTargetEntity({});
                                        setIsOpenSaveModal(false); 
                                        setErrorMessages({});
                                    } else {
                                        alertError("Um ou mais campos não estão corretamente preenchidos.")
                                        setErrorMessages(validationResult.errors)
                                    }
                                }
                            },
                        ]}
                    />
            }
        </div>
    )
}