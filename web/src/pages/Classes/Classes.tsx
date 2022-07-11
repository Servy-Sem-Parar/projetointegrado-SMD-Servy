import { useEffect, useState } from "react"
import { ListPage } from "../../components/ListPage/ListPage";
import { getColumns } from "./getColumns";
import { ModalsProvider, openSaveModal } from "./ModalsProvider/ModalsProvider";
import { getEntities, getDisciplinas } from "./requester";

export let updateEntities: ()=>void;

function Classes() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [turmas, setTurmas] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({
        sort: "name",
        order: "asc",
        limit: 10,
    });
    
    updateEntities = ()=>{
        getEntities(offset, filters).then(result=>{
            setEntities(result.data)
            setTotal(result.total*10)
        })
    }

    useEffect(()=>{
        getEntities(offset, filters).then(result=>{
            setEntities(result.data)
            setTotal(result.total*10)
        })
        getDisciplinas().then(result=>{
            setTurmas(result);
        })
    }, [offset, filters])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Turmas"}
                titleButtonLabel={"Nova turma"}
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
                        placeholder: "Filtrar por disciplina",
                        control: "disciplina",
                        type: "select",
                        options: turmas as { label: string; value: string; }[]
                    },
                    {
                        placeholder: "Filtrar por nível",
                        control: "level",
                        type: "text",
                    },
                ]}
                defaultFilter={{
                    sort: "name",
                    order: "asc",
                    limit: 10,
                }}
                filtersSearchCallBack={(filters: Record<string, unknown>)=>{
                    setFilters(filters);
                    setOffset(0);
                }}
                offset={offset}
                setOffset={(offset: number)=>{
                    setOffset(offset);
                }}
                total={total}
            />
        </div>
    )
}  

export default Classes;