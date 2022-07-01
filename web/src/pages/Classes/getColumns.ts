import { IColumn } from "../../components/ListPage/ListPage"
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    const columns: IColumn[]  = [
        {
            type: "icon",
            label: "",
            control: "icon",
        },
        {
            type: "string",
            label: "Nome",
            control: "name",
            orderControl: "name",
        },
        {
            type: "string",
            label: "Nível",
            control: "level",
            orderControl: "level",
        },
        {
            type: "string",
            label: "Alunas",
            control: "studentsCount",
        },
        {
            type: "string",
            label: "Aulas",
            control: "aulasCount",
        },
        {
            type: "action",
            label: "Ações",
            control: "action",
            actions: [
                {
                    label: "Detalhes",
                    callback: (entity: Record<string, unknown>)=>{
                        window.location.pathname = `turmas/${entity._id}`
                    }
                },
                {
                    label: "Editar",
                    callback: (entity: Record<string, unknown>)=>{
                        openSaveModal(entity)
                    }
                },
                {
                    label: "Remover",
                    callback: (entity: Record<string, unknown>)=>{
                        openDeleteModal(entity)
                    }
                },
            ],
        }
    ]

    return columns;
}