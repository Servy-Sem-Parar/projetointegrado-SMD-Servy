import { IColumn } from "../../components/ListPage/ListPage";
import { openSaveModal } from "./ModalsProvider/ModalsProvider";

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
                type: "string",
                label: "Data",
                control: "dateToShow",
                orderControl: "createdAt",
            },
            {
                type: "view",
                label: "Ver mais",
                control: "view",
                viewCallback: (entity: Record<string, unknown>)=>{
                    openSaveModal(entity)
                }
            },
        ]
    )

    return columns;
}