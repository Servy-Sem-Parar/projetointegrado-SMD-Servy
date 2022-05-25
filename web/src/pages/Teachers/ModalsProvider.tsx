import { useState } from "react";
import { SaveModal } from "../../components/SaveModal/SaveModal"
import { getSaveModalFields } from "./getSaveModalFields";

export let openSaveModal:(targetEntity?: Record<string, unknown>)=>void;

export function ModalsProvider() {
    const [targetEntity, setTargetEntity] = useState<Record<string, unknown>>({})
    const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    openSaveModal = (targetEntity?: Record<string, unknown>)=>{ 
        if(targetEntity){
            setTargetEntity(targetEntity); 
        }
        setIsOpenSaveModal(true) 
    }

    return (
        <div>
            <SaveModal
                titleLabel={targetEntity.id ? "Editar Professora" : "Nova Professora"}
                showModal={isOpenSaveModal}
                closeModal={()=>{setIsOpenSaveModal(false); setTargetEntity({})}}
                targetEntity={targetEntity}
                fields={getSaveModalFields({initialEntity: targetEntity, errorMessages})}
            />
        </div>
    )
}