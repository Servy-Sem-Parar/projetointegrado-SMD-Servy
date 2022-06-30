import { useEffect, useState } from "react";
import { alertError, alertSuccess } from "../../../components/Alert/Alert";
import { SaveModal } from "../../../components/SaveModal/SaveModal"
import { validateAllInputs } from "../../../Tools/validateInputs";
import { editEntity, getStudents } from "../requester";
import { updateTurma } from "../ClassDetails";
import { getAddStudentModalFields } from "./getAddStudentModalFields";

export let openAddStudentModal:(targetEntity: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({});
    const [isOpenAddStudentModal, setIsOpenAddStudentModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [allStudents, setAllStudents] = useState<Record<string, unknown>[]>([]);
    const [students, setStudents] = useState<Record<string, unknown>[]>([]);

    useEffect(()=>{
        getStudents().then(response=>{
            setStudents(response);
            setAllStudents(response);
        })
    }, [])

    openAddStudentModal = (targetEntity: Record<string, unknown>)=>{ 
        const alunas = targetEntity.students as string[];
        const filteredStudents = allStudents.filter(student=> !alunas.includes(student.value as string));

        setStudents(filteredStudents);
        setTargetEntity({...targetEntity}); 
        setEntity({...targetEntity});
        setIsOpenAddStudentModal(true);
    }

    return (
        <div>
            {
                isOpenAddStudentModal && 
                    <SaveModal
                        titleLabel={"Adicionar alunas"}
                        showModal={isOpenAddStudentModal}
                        closeModal={()=>{setIsOpenAddStudentModal(false); setTargetEntity({}); setErrorMessages({});}}
                        targetEntity={targetEntity}
                        fields={
                            getAddStudentModalFields({
                                initialEntity: targetEntity, 
                                errorMessages, 
                                onChange: (field: string, value: string | Date | string[] )=>{
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
                                        const success = await editEntity(entity, targetEntity._id as string);
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
        </div>
    )
}