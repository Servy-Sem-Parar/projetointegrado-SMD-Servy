import "./ListPage.css";
import { GoPlus } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { Popover } from "./Popover/Popover";
import { Pagination } from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { getIconByName } from "../../Tools/getIconByName";
import { MdCheckCircle, MdList, MdVisibility } from "react-icons/md";

interface IListPageProps {
    title: string,
    entities: Record<string, unknown>[],
    columns: IColumn[],
    titleButtonLabel: string,
    titleButtonCallback: ()=>void,
    titleButtomCustomIcon?: boolean,
    secondaryButtonLabel?: string,
    secondaryButtonCallback?: ()=>void,
    secondaryButtonCount?: number,
    defaultFilter?: Record<string, unknown>,
    defaultOrder?: {
        order: string,
        sort: string
    }
    filters?: {
        placeholder: string,
        control: string,
        type: string,
        options?: {
            label: string,
            value: string,
        }[]
    }[],
    filtersSearchCallBack?: (filters: Record<string, unknown>)=>void,
    offset: number,
    setOffset: (offset: number)=>void,
    total: number,
}

export interface IColumn {
    type: string,
    label: string,
    control: string,
    actions?: IAction[],
    orderControl?: string,
    viewCallback?: (entity: Record<string, unknown>)=>void,
}

interface IAction {
    label: string,
    callback: (entity: Record<string, unknown>)=>void,
}

export function ListPage(props: IListPageProps) {
    const [filters, setFilters] = useState<Record<string, unknown>>({});
    const [order, setOrder] = useState("asc");
    const [sort, setSort] = useState("name");

    useEffect(()=>{
        if(props.defaultFilter) {
            setFilters(props.defaultFilter);
        }
        if(props.defaultOrder) {
            setOrder(props.defaultOrder.order);
            setSort(props.defaultOrder.sort);
        }
    }, [])

    return (
        <div className="list_page_body">
            <header className="list-page-header">
                <h1 className="list-page-title">{props.title}</h1>
                <div style={{display: "flex"}}>
                    {props.secondaryButtonLabel && props.secondaryButtonCallback &&
                        <button className="title-button" onClick={()=>{props.secondaryButtonCallback && props.secondaryButtonCallback()}}>
                            <MdCheckCircle
                                className="title-button-icon"
                            />
                            {props.secondaryButtonLabel}
                            {(props.secondaryButtonCount && props.secondaryButtonCount > 0) && <div className="button-count">{props.secondaryButtonCount}</div>}
                        </button>
                    }
                    <button className="title-button" onClick={()=>{props.titleButtonCallback()}}>
                        {props.titleButtomCustomIcon ?
                            <MdList 
                                className="title-button-icon"
                            />
                            :
                            <GoPlus
                            className="title-button-icon"
                        />
                        }
                        {props.titleButtonLabel}
                    </button>
                </div>
            </header>
            {props.filters && 
                <form 
                    className="filter-box"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        if(props.filtersSearchCallBack) {
                            props.filtersSearchCallBack(filters);
                        }
                    }}
                >
                    <div className="filter-inputs-area">
                        {
                            props.filters.map(filter=>{
                                if(filter.type === "text") {
                                    return (
                                        <input
                                            placeholder={filter.placeholder}
                                            className="filter-input"
                                            onChange={(e)=>{
                                                const value = e.target.value;
                                                const newFilters = {...filters}
                                                newFilters[filter.control] = value;
                                                setFilters(newFilters)
                                            }}
                                        />
                                    )
                                } else {
                                    return (
                                        <select
                                            placeholder={filter.placeholder}
                                            className="filter-input"
                                            defaultValue={""}
                                            onChange={(e)=>{
                                                const value = e.target.value;
                                                const newFilters = {...filters}
                                                newFilters[filter.control] = value;
                                                setFilters(newFilters)
                                            }}
                                        >
                                            <option value={""}>{"Todos"}</option>
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
                </form>
            }
            <table  style={{width: "100%", borderSpacing: "0px 10px"}}>
                <tr>
                    {
                        props.columns.map(column=>{
                            return (
                                <th 
                                    className="list-table-header-item"
                                    style={{
                                        cursor: column.orderControl ? "pointer" : "default"
                                    }}
                                    onClick={()=>{
                                        if(props.filtersSearchCallBack && column.orderControl) {
                                            const filter = {...filters};
                                            filter.sort = column.orderControl;
                                            
                                            if(sort !== column.orderControl) {
                                                filter.order = "asc";
                                            } else {
                                                if(order === "asc") {
                                                    filter.order = "desc";
                                                } else {
                                                    filter.order = "asc";
                                                }
                                            }
                                            setOrder(filter.order as string);
                                            setSort(filter.sort as string);
                                            props.filtersSearchCallBack(filter);
                                        }
                                    }}
                                >
                                    {`${column.label}${column.orderControl === sort ? order === "asc" ? " ▲" : " ▼" : ""}`}
                                </th>
                            )
                        })
                    }
                </tr>
                {
                    props.entities.map((entity, index)=>{
                        return (
                            <tr 
                                className="list-page-table-line"
                                style={{
                                    backgroundColor: entity.color ? entity.color as string : index%2 === 0 ? "#F8E3FF" : "#F1C8FF",
                                }}
                            >
                                {
                                    props.columns.map(column=>{
                                        if(column.type === "string") {
                                            return (
                                                <td 
                                                    className="list-table-line-item" 
                                                    style={{ 
                                                        minWidth: `${(100/(props.columns.length-1))}%`,
                                                    }}
                                                >
                                                    {entity[column.control] ? entity[column.control] as string : "---" }
                                                </td>
                                            )
                                        } else if(column.type === "icon") {
                                            return (
                                                <td 
                                                    className="list-table-line-item" 
                                                    id={`gear-${column.control}`}
                                                    style={{
                                                        width: "120px", 
                                                        minWidth: `120px`,
                                                        textAlign: "center",
                                                        position: "relative",
                                                    }}
                                                >
                                                    {entity[column.control] ? getIconByName(entity[column.control] as string) as JSX.Element : ""}
                                                </td>
                                            )
                                        } else if(column.type === "view") {
                                            return (
                                                <td 
                                                    className="list-table-line-item" 
                                                    id={`gear-${column.control}`}
                                                    style={{
                                                        width: "120px", 
                                                        minWidth: `120px`,
                                                        textAlign: "center",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <MdVisibility
                                                        onClick={()=>{
                                                            column.viewCallback && column.viewCallback(entity);
                                                        }}
                                                        className="gear-icon"
                                                    />
                                                </td>
                                            )
                                        } else {
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