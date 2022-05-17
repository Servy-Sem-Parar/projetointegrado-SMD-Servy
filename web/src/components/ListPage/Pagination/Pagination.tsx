import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./Pagination.css"

interface IPaginationProps {
    total: number,
    offset: number,
    setOffset: (offset: number)=>void,
}

function generatePaginationItems(offset: number, total: number, setItems: (items: number[])=>void) {
    const items = [];
    let initOffset = offset/10;
    const maxButton = total/10
    initOffset = initOffset - 2;

    if(initOffset < 0) {
        initOffset = 0;
    }
    console.log("pr", initOffset, maxButton)
    for(let i = initOffset; i < maxButton; i++) {
        if(i < initOffset + 5) {
            items.push(i+1)
        }
    }
    console.log("res", items)
    setItems(items)
}

export function Pagination(props: IPaginationProps) {
    const [paginationItens, setPaginationItems] = useState([1]);

    useEffect(()=>{
        generatePaginationItems(props.offset, props.total, (items: number[])=>{setPaginationItems(items)})
    }, [props.offset, props.total])

    return (
        <div>
            {props.total > 10 && 
                <div className="pagination-box">
                    {props.offset > 0 && <GrFormPrevious
                        className="offset-icon"
                        onClick={()=>{
                            props.setOffset(props.offset-10)
                        }}
                    />}
                    {
                        paginationItens.map(item=>{
                            return(
                                <div 
                                    className={item-1 === props.offset/10 ? "offset-item-selected" : "offset-item"}
                                    onClick={()=>{
                                        props.setOffset((item-1)*10)
                                    }}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                    {props.offset+10 < props.total && <GrFormNext
                        className="offset-icon"
                        onClick={()=>{
                            props.setOffset(props.offset+10)
                        }}
                    />}
                </div>
            }
        </div>
    )
}