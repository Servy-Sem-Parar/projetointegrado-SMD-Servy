import { useEffect, useState } from "react"
import { ListPage } from "../../components/ListPage/ListPage";
import { getColumns } from "./getColumns";
import { ModalsProvider } from "./ModalsProvider/ModalsProvider";
import { getEntities } from "./requester";

export let updateEntities: ()=>void;

function ApproveRegisters() {
    const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [filters, setFilters] = useState<Record<string, unknown>>({
        sort: "createdAt",
        order: "asc",
        limit: 10,
        status: "pending"
    });
    
    updateEntities = ()=>{
        getEntities(offset, filters).then(result=>{
            setEntities(result.data);
            setTotal(result.total*10);
        })
    }

    useEffect(()=>{
      getEntities(offset, filters).then(result=>{
        setEntities(result.data);
        setTotal(result.total*10);
      })
    }, [offset, filters])

    return (
        <div>
            <ModalsProvider/>
            <ListPage
                title={"Pedidos de cadastro"}
                titleButtonLabel={"Listagem de alunas"}
                titleButtonCallback={()=>{window.location.pathname = "alunas"}}
                titleButtomCustomIcon={true}
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
                    sort: "createdAt",
                    order: "asc",
                    limit: 10,
                    status: "pending"
                }}
                defaultOrder={{
                  sort: "createdAt",
                  order: "asc",
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

export default ApproveRegisters;