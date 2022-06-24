import { getIconByName } from "../../Tools/getIconByName";
import "./ClassCard.css";

interface IClassCardProps {
    color: string,
    id: string,
    icon: string,
    name: string
}

export function ClassCard(props: IClassCardProps){
    return (
        <div 
            className="turma-card" 
            style={{backgroundColor: props.color as string}}
            onClick={()=>{
                window.location.pathname = `turmas/${props.id}`
            }}
        >
            {getIconByName(props.icon as string) as string}
            {props.name as string}
        </div>
    )
}