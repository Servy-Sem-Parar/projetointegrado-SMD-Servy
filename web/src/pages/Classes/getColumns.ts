import { IColumn } from "../../components/ListPage/ListPage"
import { getUserPermission } from "../../Tools/getUserPermission"
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    const userPermission = getUserPermission();
    const userActions = [
        {
            label: "Detalhes",
            callback: (entity: Record<string, unknown>)=>{
                window.location.pathname = `detalhes_da_turma/${entity._id}`
            }
        },
        {
            label: "Editar",
            callback: (entity: Record<string, unknown>)=>{
                openSaveModal(entity)
            }
        }
    ];

    if(userPermission === "admin") {
        userActions.push({
            label: "Remover",
            callback: (entity: Record<string, unknown>)=>{
                openDeleteModal(entity)
            }
        })
    }

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
            actions: userActions,
        }
    ]

    return columns;
}