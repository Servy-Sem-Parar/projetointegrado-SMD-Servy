import { useEffect, useState } from "react"
import { ListPage } from "../../components/ListPage/ListPage";
import { SaveModal } from "../../components/SaveModal/SaveModal";
import { teachersArray } from "./data"
import { getColumns } from "./getColumns";
import { ModalsProvider, openSaveModal } from "./ModalsProvider";

function Teachers() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        setEntities(teachersArray)
    }, [])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Professoras e administradoras"}
                titleButtonLabel={"Nova professora"}
                titleButtonCallback={()=>{openSaveModal()}}
                entities={entities}
                columns={getColumns()}
                filters={[
                    {
                        placeholder: "Filtrar por nome",
                        control: "name",
                        type: "text",
                    },
                    {
                        placeholder: "Filtrar por email",
                        control: "email",
                        type: "text",
                    },
                    {
                        placeholder: "Filtrar por permissão",
                        control: "permission",
                        type: "select",
                        options: [
                            {label: "Professora", value: "professora"},
                            {label: "Admin", value: "admin"},
                        ]
                    },
                ]}
                offset={offset}
                setOffset={(offset: number)=>{
                    setOffset(offset)
                }}
                total={100}
            />
        </div>
    )
}  

export default Teachers;