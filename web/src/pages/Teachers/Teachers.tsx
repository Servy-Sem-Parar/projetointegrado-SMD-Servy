import { useEffect, useState } from "react"
import { ListPage } from "../../components/ListPage/ListPage";
import { teachersArray } from "./data"
import { getColumns } from "./getColumns";
import { ModalsProvider, openSaveModal } from "./ModalsProvider/ModalsProvider";
import { getEntities } from "./requester";

function Teachers() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [offset, setOffset] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({});
    
    useEffect(()=>{
        getEntities(offset, filters).then(entities=>{
            setEntities(entities)
        })
    }, [offset, filters])

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
                        control: "role",
                        type: "select",
                        options: [
                            {label: "Professora", value: "teacher"},
                            {label: "Admin", value: "admin"},
                        ]
                    },
                ]}
                filtersSearchCallBack={(filters: Record<string, unknown>)=>{
                    setFilters(filters);
                    setOffset(0);
                }}
                offset={offset}
                setOffset={(offset: number)=>{
                    setOffset(offset);
                }}
                total={100}
            />
        </div>
    )
}  

export default Teachers;