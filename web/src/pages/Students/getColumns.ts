import { IColumn } from "../../components/ListPage/ListPage"
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    const columns: IColumn[]  = (
        [
            {
                type: "string",
                label: "Nome",
                control: "name",
            },
            {
                type: "string",
                label: "Telefone",
                control: "phone",
            },
            {
                type: "string",
                label: "Email",
                control: "email",
            },
            {
                type: "action",
                label: "Ações",
                control: "action",
                actions: [
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
            },
        ]
    )

    return columns;
}