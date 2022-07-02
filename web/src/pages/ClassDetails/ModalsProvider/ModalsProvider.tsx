import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { createAula, editAula, deleteAula, editTurma, getDisciplinas, getStudents, getTeachers } from "../requester";
import { updateAulas, updateMateriais, updateTurma } from "../ClassDetails";
import { getAddStudentModalFields } from "./getAddStudentModalFields";
import { getEditTurmaModalFields, turmasFieldValidations } from "./getEditTurmaModalFields";
import { aulasFieldValidations, getAulaModalFields } from "./getAulaModalFields ";
import { formatDateToReceive } from "../../../Tools/formatDateToReceive";

export let openAddStudentModal:(targetEntity: Record<string, unknown>)=>void;
export let openEditTurmaModal:(targetEntity: Record<string, unknown>)=>void;
export let openAulaModal:(targetEntity?: Record<string, unknown>, date?: Date)=>void;

export function ModalsProvider(props: {turmaId: string}) {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenAddStudentModal, setIsOpenAddStudentModal] = useState(false);
    const [isOpenEditTurmaModal, setIsOpenEditTurmaModal] = useState(false);
    const [isOpenAulaModal, setIsOpenAulaModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [allStudents, setAllStudents] = useState<Record<string, unknown>[]>([]);
    const [students, setStudents] = useState<Record<string, unknown>[]>([]);
    const [teachers, setTeachers] = useState<Record<string, unknown>[]>([]);
    const [disciplinas, setDisciplinas] = useState<Record<string, unknown>[]>([]);
    const [disabledFields, setDisabledFields] = useState(true);

    useEffect(()=>{
        Promise.all([
            getStudents(),
            getTeachers(),
            getDisciplinas()
        ]).then(responses=>{
            setStudents(responses[0]);
            setAllStudents(responses[0]);
            setTeachers(responses[1]);
            setDisciplinas(responses[2]);
        })
    }, [])

    openAddStudentModal = (targetEntity: Record<string, unknown>)=>{ 
        const alunas = (targetEntity.studentsDefaultValue as Record<string, unknown>[]).map(student=>{
            return student.value as string;
        });
        const filteredStudents = allStudents.filter(student=> !alunas.includes(student.value as string));

        setStudents(filteredStudents);
        setTargetEntity({...targetEntity}); 
        setEntity({...targetEntity});
        setIsOpenAddStudentModal(true);
    }

    openEditTurmaModal = (targetEntity: Record<string, unknown>)=>{ 
        setTargetEntity({...targetEntity}); 
        setEntity({...targetEntity});
        setIsOpenEditTurmaModal(true);
    }

    openAulaModal = (targetEntity?: Record<string, unknown>, date?: Date)=>{ 
        if(targetEntity && targetEntity._id){
            setIsEdit(true);
            setTargetEntity({...targetEntity}); 
            setEntity({...targetEntity});
            setDisabledFields(true);
        } else {
            const editingDate = date || new Date()
            setEntity({
                materiais: [],
                turma: props.turmaId,
                date: formatDateToReceive(editingDate.getFullYear(), editingDate.getMonth()+1, editingDate.getDate(), "00:00:00")
            });
            setTargetEntity({
                materiais: [],
                turma: props.turmaId,
                date: formatDateToReceive(editingDate.getFullYear(), editingDate.getMonth()+1, editingDate.getDate(), "00:00:00")
            });
            setIsEdit(false);
            setDisabledFields(false);
        }
        setIsOpenAulaModal(true);
    }

    return (
        <div>
            {
                isOpenAddStudentModal && 
                    <SaveModal
                        titleLabel={"Adicionar alunas"}
                        showModal={isOpenAddStudentModal}
                        closeModal={()=>{setIsOpenAddStudentModal(false); setTargetEntity({}); setEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getAddStudentModalFields({
                                initialEntity: targetEntity, 
                                errorMessages, 
                                onChange: (field: string, value: string | Date | string[])=>{
                                    const newEntity = {...entity}
                                    const newStudents = value as string[];
                                    const currentStudents = targetEntity.students as string[];
                                    newEntity[field] = [ ...currentStudents, ...newStudents];
                                    setEntity(newEntity);
                                },
                                setFieldValidation: (field: string, value: string)=>{
                                    const newValidation = {...errorMessages};
                                    newValidation[field] = value;
                                    setErrorMessages(newValidation);
                                },
                                students
                            })
                        }
                        footerButtons={[
                            {
                                label: "Cancelar",
                                callback: ()=>{
                                    setTargetEntity({});
                                    setEntity({});
                                    setIsOpenAddStudentModal(false); 
                                    setErrorMessages({});
                                }
                            },
                            {
                                label: "Adicionar",
                                callback: async ()=>{
                                    const validations = {};
                                    const validationResult = validateAllInputs({entity, validations});
                                    if(validationResult.success) {                                
                                        const success = await editTurma(entity, targetEntity._id as string);
                                        if(success) {
                                            alertSuccess("Alunas adicionadas com sucesso.");
                                            setEntity({});
                                            setTargetEntity({});
                                            setIsOpenAddStudentModal(false); 
                                            setErrorMessages({});
                                            updateTurma();
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
                isOpenEditTurmaModal && 
                    <SaveModal
                        titleLabel={"Editar turma"}
                        showModal={isOpenEditTurmaModal}
                        closeModal={()=>{setIsOpenEditTurmaModal(false); setTargetEntity({}); setEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getEditTurmaModalFields({
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
                                    setIsOpenEditTurmaModal(false); 
                                    setErrorMessages({});
                                }
                            },
                            {
                                label: "Salvar",
                                callback: async ()=>{
                                    const validations = {...turmasFieldValidations};
                                    const validationResult = validateAllInputs({entity, validations});
                                    if(validationResult.success) {
                                            const success = await editTurma(entity, targetEntity._id as string);
                                            if(success) {
                                                alertSuccess("Turma editada com sucesso.");
                                                setEntity({});
                                                setTargetEntity({});
                                                setIsOpenEditTurmaModal(false); 
                                                setErrorMessages({});
                                                updateTurma();
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
                isOpenAulaModal &&
                    <SaveModal
                        titleLabel={isEdit ? "Editar aula" : "Nova aula"}
                        showModal={isOpenAulaModal}
                        closeModal={()=>{setIsOpenAulaModal(false); setTargetEntity({}); setDisabledFields(false); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getAulaModalFields({
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
                                disabled: disabledFields,
                            })
                        }
                        footerButtons={
                            disabledFields ? 
                            [
                                {
                                    label: "Deletar",
                                    callback: ()=>{
                                        deleteAula(entity._id as string).then((success)=>{
                                            if(success) {
                                                alertSuccess("Aula removida com sucesso.");
                                                setTargetEntity({});
                                                setEntity({});
                                                setIsOpenAulaModal(false); 
                                                setErrorMessages({});
                                                updateAulas();
                                                updateMateriais();
                                            }
                                        })
                                    }
                                },
                                {
                                    label: "Editar",
                                    callback: ()=>{
                                        setDisabledFields(false);
                                    }
                                },
                            ]
                            :
                            [
                                {
                                    label: "Cancelar",
                                    callback: ()=>{
                                        setTargetEntity({});
                                        setEntity({});
                                        setIsOpenAulaModal(false); 
                                        setErrorMessages({});
                                        setDisabledFields(true);
                                    }
                                },
                                {
                                    label: "Salvar",
                                    callback: async ()=>{
                                        const newEntity = {...entity};
                                        newEntity.date = (newEntity.date as string).substr(0,10) + "T" + newEntity.hour as string + ":00.997Z";
                                        if(newEntity.materiais) {
                                            newEntity.materiais = (newEntity.materiais as Record<string, unknown>[]).map(material=>{
                                                return ({
                                                    date: newEntity.date,
                                                    ...material
                                                })
                                            })
                                        }
                                        const validations = {...aulasFieldValidations};
                                        const validationResult = validateAllInputs({entity, validations});
                                        if(validationResult.success) {
                                            if(isEdit) {
                                                const success = await editAula(newEntity, targetEntity._id as string);
                                                if(success) {
                                                    alertSuccess("Aula editada com sucesso.");
                                                    setEntity({});
                                                    setTargetEntity({});
                                                    setIsOpenAulaModal(false); 
                                                    setErrorMessages({});
                                                    setDisabledFields(true);
                                                    updateAulas();
                                                    updateMateriais();
                                                }
                                            } else {
                                                const success = await createAula(newEntity);
                                                if(success) {
                                                    alertSuccess("Aula criada com sucesso.");
                                                    setEntity({});
                                                    setTargetEntity({});
                                                    setIsOpenAulaModal(false); 
                                                    setErrorMessages({});
                                                    setDisabledFields(true);
                                                    updateAulas();
                                                    updateMateriais();
                                                }
                                            }
                                        } else {
                                            alertError("Um ou mais campos não estão corretamente preenchidos.");
                                            setErrorMessages(validationResult.errors);
                                        }
                                    }
                                },
                            ]
                        }
                    />
            }
        </div>
    )
}