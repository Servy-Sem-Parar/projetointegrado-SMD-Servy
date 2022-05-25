import { openSaveModal } from "./ModalsProvider"

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
                control: "phone_number",
            },
            {
                type: "string",
                label: "Email",
                control: "email",
            },
            {
                type: "string",
                label: "Permissão",
                control: "role",
            },
            {
                type: "action",
                label: "Ações",
                control: "action",
                actions: [
                    {
                        label: "Remover",
                        callback: (entity: Record<string, unknown>)=>{
                            console.log("Remove", entity)
                        }
                    },
                    {
                        label: "Editar",
                        callback: (entity: Record<string, unknown>)=>{
                            openSaveModal(entity)
                        }
                    },
                ],
            },
        ]
    )
}