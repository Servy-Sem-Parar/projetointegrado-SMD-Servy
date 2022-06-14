import { IColumn } from "../../components/ListPage/ListPage"
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    const columns: IColumn[]  = (
        [
            {
                type: "string",
                label: "Nome",
                control: "name",
                orderControl: "name",
            },
            {
                type: "string",
                label: "Telefone",
                control: "phone",
                orderControl: "phone_number",
            },
            {
                type: "string",
                label: "Email",
                control: "email",
                orderControl: "email",
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