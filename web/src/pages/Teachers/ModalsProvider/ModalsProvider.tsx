import { useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { DeleteModal } from "../../../components/DeleteModal/DeleteModal";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { createEntity, deleteEntity, editEntity } from "../requester";
import { updateEntities } from "../Teachers";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;
export let openDeleteModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            if(targetEntity._id) {
                setIsEdit(true);
            } 
            setTargetEntity({...targetEntity}); 
            setEntity({...targetEntity})
        } else {
            setIsEdit(false);
        }
        setIsOpenSaveModal(true) 
    }

    openDeleteModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setIsOpenDeleteModal(true) 
    }

    return (
        <div>
            {
                isOpenSaveModal && 
                    <SaveModal
                        titleLabel={isEdit ? "Editar Professora" : "Nova Professora"}
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
                                isEdit,
                                passwordValue: entity.password ? entity.password as string : "",
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
                                callback: async ()=>{
                                    const validations = {...fieldValidations}
                                    if(isEdit) {
                                        validations.password = [];
                                        validations.retypePassword = [];
                                    }
                                    //console.log("cv", validations, isEdit)
                                    const validationResult = validateAllInputs({entity, validations, matchValue: entity.password ? entity.password as string : ""})
                                    
                                    if(validationResult.success) {
                                        if(isEdit) {
                                            const success = await editEntity(entity, targetEntity._id as string);//.then(success=>{
                                                if(success) {
                                                    alertSuccess("Usuário editado com sucesso.")
                                                    setEntity({});
                                                    setTargetEntity({});
                                                    setIsOpenSaveModal(false); 
                                                    setErrorMessages({});
                                                    updateEntities();
                                                }
                                            //});
                                        } else {
                                            const success = await createEntity(entity);//.then(success=>{
                                                if(success) {
                                                    alertSuccess("Usuário criado com sucesso.")
                                                    setEntity({});
                                                    setTargetEntity({});
                                                    setIsOpenSaveModal(false); 
                                                    setErrorMessages({});
                                                    updateEntities();
                                                }
                                            //});
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
            {
                isOpenDeleteModal && 
                    <DeleteModal
                        titleLabel={"Remover professora"}
                        showModal={isOpenDeleteModal}
                        closeModal={()=>{setIsOpenDeleteModal(false)}}
                        callback={()=>{
                            deleteEntity(targetEntity._id as string);
                            setIsOpenDeleteModal(false);
                            setTargetEntity({});
                            updateEntities();
                        }}
                        bodyLabel={"Essa ação ira remover a professora."}
                    />
            }
        </div>
    )
}