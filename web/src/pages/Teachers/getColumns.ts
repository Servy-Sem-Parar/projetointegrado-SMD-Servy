import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    return (
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
                type: "string",
                label: "Permissão",
                control: "permission",
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
}