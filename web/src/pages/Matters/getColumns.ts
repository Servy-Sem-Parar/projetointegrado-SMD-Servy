import { IColumn } from "../../components/ListPage/ListPage";
import { getUserPermission } from "../../Tools/getUserPermission"
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    const permission = getUserPermission();
    const columns: IColumn[] = [
        {
            type: "string",
            label: "Nome",
            control: "name",
        },
        {
            type: "string",
            label: "Descrição",
            control: "description",
        },
    ];

    if(permission === "admin") {
        columns.push({
            type: "action",
            label: "Ações",
            control: "action",
            actions: [
                {
                    label: "Remover",
                    callback: (entity: Record<string, unknown>)=>{
                        openDeleteModal(entity);
                    }
                },
                {
                    label: "Editar",
                    callback: (entity: Record<string, unknown>)=>{
                        openSaveModal(entity);
                    }
                },
            ],
        })
    }

    return columns;
}