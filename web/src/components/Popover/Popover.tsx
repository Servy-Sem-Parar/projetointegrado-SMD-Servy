import { useEffect, useState } from "react";
import {BsFillGearFill} from "react-icons/bs";
import {AiFillEdit} from "react-icons/ai";
import {AiTwotoneDelete} from "react-icons/ai";

import "./Popover.css"

interface IPopoverProps {
    control: number;
    entity: Record<string, unknown>;
    actions?: {
        label: string,
        callback: (entity: Record<string, unknown>)=>void
    }[]
}

function getActionIcon(action: string) {
    if(action === "Remover") {
        return (
            <AiTwotoneDelete
                className="popover-icon"
            />
        )
    } else if(action === "Editar") {
        return (
            <AiFillEdit
                className="popover-icon"
            />
        )
    }
}



export function Popover(props: IPopoverProps) {
    const [showPopover, setShowPopover] = useState(false)

    function handleClickOutside(e: MouseEvent) {
        const elem = document.getElementById(`gear-${props.control}`) as HTMLElement
        if(!elem.contains(e.target as Node)) {
            setShowPopover(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('click', handleClickOutside, false)
    }, [])

    

    return (
        <td 
            className="list-table-line-item" 
            id={`gear-${props.control}`}
            style={{
                width: "100px", 
                minWidth: `100px`,
                textAlign: "center",
                position: "relative",
            }}
        >
            <BsFillGearFill
                
                onClick={()=>{
                    setShowPopover(!showPopover);
                }}
                onBlur={()=>{
                    setShowPopover(false)
                }}
                className="gear-icon"
            />
            { showPopover &&
                <div className="popover-body">
                    {
                        props.actions && props.actions.map(action=>{
                            return (
                                <div className="popover-item" onClick={()=>{
                                    action.callback(props.entity)
                                }}>
                                    {action.label}
                                    {getActionIcon(action.label)}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </td>
    )
}