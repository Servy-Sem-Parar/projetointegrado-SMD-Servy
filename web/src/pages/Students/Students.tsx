import { useEffect, useState } from "react"
import { ListPage } from "../../components/ListPage/ListPage";
import { getColumns } from "./getColumns";
import { ModalsProvider, openSaveModal } from "./ModalsProvider/ModalsProvider";
import { getEntities, getPendingCount } from "./requester";

export let updateEntities: ()=>void;

function Students() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({
        sort: "name",
        order: "asc",
        limit: 10,
        status: "approved"
    });
    
    updateEntities = ()=>{
        getEntities(offset, filters).then(result=>{
            setEntities(result.data);
            setTotal(result.total*10);
        })
    }

    useEffect(()=>{
        Promise.all([getEntities(offset, filters), getPendingCount()]).then(results=>{
            setEntities(results[0].data);
            setTotal(results[0].total*10);
            setPendingCount(results[1]);
        })
    }, [offset, filters])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Alunas"}
                titleButtonLabel={"Nova aluna"}
                titleButtonCallback={()=>{openSaveModal()}}
                secondaryButtonLabel={"Aprovar cadastros"}
                secondaryButtonCallback={()=>{window.location.pathname = "aprovar_cadastros"}}
                secondaryButtonCount={pendingCount}
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
                ]}
                defaultFilter={{
                    sort: "name",
                    order: "asc",
                    limit: 10,
                    status: "approved"
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

export default Students;