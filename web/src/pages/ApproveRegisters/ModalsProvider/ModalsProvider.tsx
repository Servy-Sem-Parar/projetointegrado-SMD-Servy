import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { editEntity, getEntity, getTurmas } from "../requester";
import { updateEntities } from "../ApproveRegisters";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [turmas, setTurmas] = useState<Record<string, unknown>[]>([]);

    useEffect(()=>{
        getTurmas().then(options=>{
            setTurmas(options);
        })
    }, [])

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            if(targetEntity._id) {
                getEntity(targetEntity._id as string, turmas).then(resp=>{
                    setTargetEntity({...resp}); 
                    setEntity({...resp})
                })
            } 
        }
        setIsOpenSaveModal(true) 
    }

    return (
        <>
            {
                ((isOpenSaveModal && targetEntity && targetEntity._id)) && 
                    <SaveModal
                        titleLabel={"Dados da aluna"}
                        showModal={isOpenSaveModal}
                        closeModal={()=>{setIsOpenSaveModal(false); setTargetEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getSaveModalFields({
                                initialEntity: targetEntity, 
                                errorMessages, 
                                onChange: (field: string, value: string | Date | string[] )=>{
                                    const newEntity = {...entity}
                                    newEntity[field] = value;
                                    setEntity(newEntity)
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...errorMessages};
                                    newValidation[field] = value;
                                    setErrorMessages(newValidation);
                                },
                                turmas
                            })
                        }
                        footerButtons={[
                            {
                                label: "Reprovar",
                                callback: async ()=>{
                                    const validations = {...fieldValidations}
                                    const validationResult = validateAllInputs({entity, validations})
                                    
                                    if(validationResult.success) {
                                        const finalEntity = {...entity};
                                        finalEntity.status = "disapproved";
                                        const success = await editEntity(finalEntity, targetEntity._id as string);
                                        if(success) {
                                            alertSuccess("Aluna editado com sucesso.")
                                            setEntity({});
                                            setTargetEntity({});
                                            setIsOpenSaveModal(false); 
                                            setErrorMessages({});
                                            updateEntities();
                                        }
                                    } else {
                                        alertError("Um ou mais campos não estão corretamente preenchidos.")
                                        setErrorMessages(validationResult.errors)
                                    }
                                }
                            },
                            {
                                label: "Aprovar",
                                callback: async ()=>{
                                    const validations = {...fieldValidations}
                                    const validationResult = validateAllInputs({entity, validations})
                                    
                                    if(validationResult.success) {
                                        const finalEntity = {...entity};
                                        //finalEntity.wantedTurmas = finalEntity.turmas;
                                        //finalEntity.turmas = [];
                                        finalEntity.turmas = finalEntity.wantedTurmas;
                                        finalEntity.status = "approved";
                                        const success = await editEntity(finalEntity, targetEntity._id as string);
                                        if(success) {
                                            alertSuccess("Aluna editado com sucesso.")
                                            setEntity({});
                                            setTargetEntity({});
                                            setIsOpenSaveModal(false); 
                                            setErrorMessages({});
                                            updateEntities();
                                        }
                                    } else {
                                        alertError("Um ou mais campos não estão corretamente preenchidos.")
                                        setErrorMessages(validationResult.errors)
                                    }
                                }
                            },
                        ]}
                    />
            }
        </>
    )
}