import "./ListPage.css";
import {GoPlus} from "react-icons/go";
import {FaSearch} from "react-icons/fa";
import { Popover } from "../Popover/Popover";
//import { useState } from "react";
import { Pagination } from "./Pagination/Pagination";

interface IListPageProps {
    title: string,
    entities: Record<string, unknown>[],
    columns: IColumn[],
    titleButtonLabel: string,
    titleButtonCallback: ()=>void,
    filters?: {
        placeholder: string,
        control: string,
        type: string,
        options?: {
            label: string,
            value: string,
        }[]
    }[],
    offset: number,
    setOffset: (offset: number)=>void,
    total: number,
}

interface IColumn {
    type: string,
    label: string,
    control: string,
    actions?: IAction[],
}

interface IAction {
    label: string,
    callback: (entity: Record<string, unknown>)=>void,
}

export function ListPage(props: IListPageProps) {
    //const [filters, setFilters] = useState({})

    return (
        <div className="list_page_body">
            <header className="list-page-header">
                <h1 className="list-page-title">{props.title}</h1>
                <button className="title-button" onClick={()=>{props.titleButtonCallback()}}>
                    <GoPlus
                        className="title-button-icon"
                    />
                    {props.titleButtonLabel}
                </button>
            </header>
            {props.filters && 
                <div className="filter-box">
                    <div className="filter-inputs-area">
                        {
                            props.filters.map(filter=>{
                                if(filter.type === "text") {
                                    return (
                                        <input
                                            placeholder={filter.placeholder}
                                            className="filter-input"
                                        />
                                    )
                                } else {
                                    return (
                                        <select
                                            placeholder={filter.placeholder}
                                            className="filter-input"
                                            defaultValue={""}
                                        >
                                            <option value={""} disabled hidden>{filter.placeholder}</option>
                                            {
                                                filter.options && filter.options.map((option)=>{
                                                    return(
                                                        <option value={option.value}>{option.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    )
                                }
                            })
                        }
                    </div>
                    <button
                        className="filter-searchButton"
                    >
                        <FaSearch />
                    </button>
                </div>
            }
            <table  style={{width: "100%", borderSpacing: "0px 10px"}}>
                <tr>
                    {
                        props.columns.map(column=>{
                            return (
                                <th className="list-table-header-item">{column.label}</th>
                            )
                        })
                    }
                </tr>
                {
                    props.entities.map((entity, index)=>{
                        return (
                            <tr className="list-page-table-line">
                                {
                                    props.columns.map(column=>{
                                        if(column.type === "string") {
                                            return (
                                                <td 
                                                    className="list-table-line-item" 
                                                    style={{ 
                                                        width: `${(100/(props.columns.length-1))}%`,
                                                    }}
                                                >
                                                    {entity[column.control] as string}
                                                </td>
                                            )
                                        } else if (column.type === "action") {
                                            return (
                                                <Popover
                                                    control={index}
                                                    actions={column.actions && column.actions}
                                                    entity={entity}
                                                />
                                            )
                                        }
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </table>
            <Pagination
                total={props.total}
                offset={props.offset}
                setOffset={props.setOffset}
            />
        </div>
    )
}