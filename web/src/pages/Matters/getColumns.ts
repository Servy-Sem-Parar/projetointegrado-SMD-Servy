import { IColumn } from "../../components/ListPage/ListPage";
import { getUserPermission } from "../../Tools/getUserPermission"
import { openDeleteModal, openSaveModal } from "./ModalsProvider/ModalsProvider"

export function getColumns() {
    const permission = getUserPermission();
    const columns: IColumn[] = [
        {
            type: "icon",
            label: "Ícone",
            control: "iconName",
        },
        {
            type: "string",
            label: "Nome",
            control: "name",
        },
    ];

    if(permission === "admin") {
        columns.push({
            type: "action",
            label: "Ações",
            control: "action",
            actions: [
                {
                    label: "Editar",
                    callback: (entity: Record<string, unknown>)=>{
                        openSaveModal(entity);
                    }
                },
                {
                    label: "Remover",
                    callback: (entity: Record<string, unknown>)=>{
                        openDeleteModal(entity);
                    }
                },
            ],
        })
    }

    return columns;
}