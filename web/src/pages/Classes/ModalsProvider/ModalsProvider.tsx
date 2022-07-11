import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { DeleteModal } from "../../../components/DeleteModal/DeleteModal";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { createEntity, deleteEntity, editEntity, finalizarTurma, getDisciplinas, getStudents, getTeachers } from "../requester";
import { updateEntities } from "../Classes";
import { fieldValidations, getSaveModalFields } from "./getSaveModalFields";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;
export let openDeleteModal:(targetEntity: Record<string, unknown>)=>void;
export let openFinishModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [disciplinas, setDisciplinas] = useState<Record<string, unknown>[]>([]);
    const [teachers, setTeachers] = useState<Record<string, unknown>[]>([]);
    const [students, setStudents] = useState<Record<string, unknown>[]>([]);
    const [isOpenFinishModal, setIsOpenFinishModal] = useState(false);

    useEffect(()=>{
        Promise.all([
            getDisciplinas(),
            getTeachers(),
            getStudents(),
        ]).then(responses=>{
            setDisciplinas(responses[0]);
            setTeachers(responses[1]);
            setStudents(responses[2]);
        })
    }, [])

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            if(targetEntity._id) {
                setIsEdit(true);
            } 
            setTargetEntity({...targetEntity}); 
            setEntity({...targetEntity});
        } else {
            setIsEdit(false);
        }
        setIsOpenSaveModal(true);
    }

    openDeleteModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setIsOpenDeleteModal(true);
    }

    openFinishModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setIsOpenFinishModal(true);
    }

    return (
        <div>
            {
                isOpenSaveModal && 
                    <SaveModal
                        titleLabel={isEdit ? "Editar turma" : "Nova turma"}
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
                                    setEntity(newEntity);
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...errorMessages};
                                    newValidation[field] = value;
                                    setErrorMessages(newValidation);
                                },
                                disciplinas,
                                teachers,
                                students
                            })
                        }
                        footerButtons={[
                            {
                                label: "Cancelar",
                                callback: ()=>{
                                    setTargetEntity({});
                                    setEntity({});
                                    setIsOpenSaveModal(false); 
                                    setErrorMessages({});
                                }
                            },
                            {
                                label: "Salvar",
                                callback: async ()=>{
                                    const validations = {...fieldValidations};
                                    const validationResult = validateAllInputs({entity, validations});
                                    if(validationResult.success) {
                                        if(isEdit) {
                                            const success = await editEntity(entity, targetEntity._id as string);
                                            if(success) {
                                                alertSuccess("Turma editada com sucesso.");
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenSaveModal(false); 
                                                setErrorMessages({});
                                                updateEntities();
                                            }
                                        } else {
                                            const success = await createEntity(entity);
                                            if(success) {
                                                alertSuccess("Turma criada com sucesso.");
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenSaveModal(false); 
                                                setErrorMessages({});
                                                updateEntities();
                                            }
                                        }
                                    } else {
                                        alertError("Um ou mais campos não estão corretamente preenchidos.");
                                        setErrorMessages(validationResult.errors);
                                    }
                                }
                            },
                        ]}
                    />
            }
            {
                isOpenDeleteModal && 
                    <DeleteModal
                        titleLabel={"Remover turma"}
                        showModal={isOpenDeleteModal}
                        closeModal={()=>{setIsOpenDeleteModal(false)}}
                        callback={()=>{
                            deleteEntity(targetEntity._id as string);
                            setIsOpenDeleteModal(false);
                            setTargetEntity({});
                            updateEntities();
                        }}
                        bodyLabel={"Essa ação irá remover a turma."}
                    />
            }
            {
                isOpenFinishModal && 
                    <DeleteModal
                        titleLabel={"Finalizar turma"}
                        showModal={isOpenFinishModal}
                        closeModal={()=>{setIsOpenFinishModal(false)}}
                        buttomLabel={"Finalizar"}
                        checkBoxLabel={"Continuar"}
                        callback={()=>{
                            finalizarTurma(targetEntity._id as string);
                            setIsOpenFinishModal(false);
                            setTargetEntity({});
                        }}
                        bodyLabel={"Essa ação é usada no final no semestre para limpar as aulas agendadas e materias. Deseja continuar?"}
                    />
            }
        </div>
    )
}