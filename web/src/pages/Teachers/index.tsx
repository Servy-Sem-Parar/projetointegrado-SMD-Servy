import { useEffect, useState } from "react"
import { ListPage } from "../../components/ListPage/ListPage";
import { teachersArray } from "./data"
import { getColumns } from "./getColumns";

function Teachers() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        setEntities(teachersArray)
    }, [])

    return (
        <ListPage
            title={"Professoras"}
            titleButtonLabel={"Nova professora"}
            titleButtonCallback={()=>{console.log("nova prof")}}
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
                    type: "text",
                },
            ]}
            offset={offset}
            setOffset={(offset: number)=>{
                setOffset(offset)
            }}
            total={100}
        />
    )
}  

export default Teachers;