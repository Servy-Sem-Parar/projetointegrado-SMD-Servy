import { useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { editEntity, editPassword, getEntity } from "./requester";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";
import { getPasswordModalFields, passwordFieldValidations } from "./getPasswordModalFields";

export let openProfileModal:()=>void;

export function ProfileModalProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
    const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [passwordErrorMessages, setPasswordErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [passwordEntity, setPasswordEntity] = useState<Record<string, unknown>>({});
    const [ableToEdit, setAbleToEdit] = useState(false);

    openProfileModal = ()=>{ 
        const user = JSON.parse(localStorage.getItem("user") as string);
        getEntity(user._id as string).then(resp=>{
            setTargetEntity({...resp}); 
            setEntity({...resp})
        })
        setIsOpenProfileModal(true) 
    }

    return (
        <>
            {
                ((isOpenProfileModal && targetEntity && targetEntity._id)) && 
                    <SaveModal
                        titleLabel={"Meus dados"}
                        showModal={isOpenProfileModal}
                        closeModal={()=>{setIsOpenProfileModal(false); setEntity({}); setTargetEntity({}); setAbleToEdit(false); setErrorMessages({});}}
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
                                ableToEdit
                            })
                        }
                        footerButtons={
                            ableToEdit ? [
                                {
                                    label: "Cancelar",
                                    callback: ()=>{
                                        setTargetEntity({});
                                        setEntity({})
                                        setIsOpenProfileModal(false); 
                                        setErrorMessages({});
                                        setAbleToEdit(false);
                                    }
                                },
                                {
                                    label: "Salvar",
                                    callback: async ()=>{
                                        const validations = {...fieldValidations}
                                        const validationResult = validateAllInputs({entity, validations})
                                        
                                        if(validationResult.success) {
                                            const success = await editEntity(entity, targetEntity._id as string);
                                            if(success) {
                                                alertSuccess("Perfil editado com sucesso.")
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenProfileModal(false); 
                                                setErrorMessages({});
                                                setAbleToEdit(false);
                                            }
                                        } else {
                                            alertError("Um ou mais campos não estão corretamente preenchidos.")
                                            setErrorMessages(validationResult.errors)
                                        }
                                    }
                                },
                            ]
                            : 
                            [
                                {
                                    label: "Mudar senha",
                                    callback: ()=>{
                                        setIsOpenProfileModal(false); 
                                        setTargetEntity({}); 
                                        setAbleToEdit(false); 
                                        setErrorMessages({});
                                        setEntity({});
                                        setIsOpenPasswordModal(true);
                                    }
                                },
                                {
                                    label: "Editar",
                                    callback: ()=>{
                                        setAbleToEdit(true);
                                    }
                                },
                            ]
                        }
                    />
            }
            {
                isOpenPasswordModal && 
                    <SaveModal
                        titleLabel={"Mudar senha"}
                        showModal={isOpenPasswordModal}
                        closeModal={()=>{setIsOpenPasswordModal(false); setPasswordErrorMessages({});}}
                        targetEntity={{}}
                        fields={
                            getPasswordModalFields({
                                initialEntity: {}, 
                                errorMessages: passwordErrorMessages, 
                                onChange: (field: string, value: string | Date | string[] )=>{
                                    const newEntity = {...passwordEntity}
                                    newEntity[field] = value;
                                    setPasswordEntity(newEntity)
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...passwordErrorMessages};
                                    newValidation[field] = value;
                                    setPasswordErrorMessages(newValidation);
                                },
                                passwordValue: passwordEntity.newPassword ? passwordEntity.newPassword as string : ""
                            })
                        }
                        footerButtons={[
                                {
                                    label: "Cancelar",
                                    callback: ()=>{
                                        setPasswordEntity({})
                                        setIsOpenPasswordModal(false); 
                                        setPasswordErrorMessages({});
                                    }
                                },
                                {
                                    label: "Salvar",
                                    callback: async ()=>{
                                        const validationResult = validateAllInputs({entity: passwordEntity, validations: passwordFieldValidations, matchValue: passwordEntity.newPassword ? passwordEntity.newPassword as string : ""})
                                        
                                        if(validationResult.success) {
                                            const query = passwordEntity;
                                            query.email = JSON.parse(localStorage.getItem("user") as string).email;
                                            const success =  await editPassword(query);
                                            if(success) {
                                                alertSuccess("Senha editada com sucesso.")
                                                setPasswordEntity({})
                                                setIsOpenPasswordModal(false); 
                                                setPasswordErrorMessages({});
                                            }
                                        } else {
                                            alertError("Um ou mais campos não estão corretamente preenchidos.")
                                            setPasswordErrorMessages(validationResult.errors)
                                        }
                                    }
                                },
                            ] 
                        }
                    />
            }
        </>
    )
}