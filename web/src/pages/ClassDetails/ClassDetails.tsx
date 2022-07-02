import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getAulas, getTurma } from "./requester";
import "./ClassDetails.css";
import { formatDateToSend } from "../../Tools/formatDateToSend";
import { Calendar } from "../../components/Calendar/Calendar";
import moment from "moment";
import { ModalsProvider, openAddStudentModal, openAulaModal, openEditTurmaModal } from "./ModalsProvider/ModalsProvider";

const startMonth = new Date().getMonth();
const startYear = new Date().getFullYear();

export let updateTurma: ()=>void;
export let updateAulas: ()=>void;

export function ClassDetails() {
    const [turma, setTurma] = useState<Record<string, unknown>>({});
    const [aulas, setAulas] = useState<Record<string, unknown>[]>([]);
    const [date, setDate] = useState(new Date(startYear, startMonth, 1));
    let { id } = useParams();

    useEffect(()=>{
        const dateStart = formatDateToSend(date.getFullYear(), date.getMonth()+1, 1, "00:00:00");
        const dateEnd = formatDateToSend(date.getFullYear(), date.getMonth()+1, new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(), "23:59:59");
        
        Promise.all([
            getTurma(id as string), 
            getAulas(id as string, dateStart, dateEnd)
        ]).then(result=>{
            const turma = result[0];
            const aulas = result[1];
            const formatedAulas: Record<string, unknown>[] = [];
                aulas.forEach(aula=>{
                const day = parseInt((aula.date as string).substr(8,2));
                const month = parseInt((aula.date as string).substr(5,2));
                const year = parseInt((aula.date as string).substr(0,4));
                aula.day = day;
                aula.month = month;
                aula.year = year;
                aula.onClickCallback = ()=>{openAulaModal(aula)};
                formatedAulas.push(aula);
            })

            setAulas(formatedAulas);
            setTurma(turma);
        })
    }, [id, date])

    updateTurma = ()=>{
        getTurma(id as string).then(turma=>{
            setTurma(turma);
        })
    }

    updateAulas = ()=>{
        const dateStart = formatDateToSend(date.getFullYear(), date.getMonth()+1, 1, "00:00:00");
        const dateEnd = formatDateToSend(date.getFullYear(), date.getMonth()+1, new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(), "23:59:59");

        getAulas(id as string, dateStart, dateEnd).then(aulas=>{
            const formatedAulas: Record<string, unknown>[] = [];
                aulas.forEach(aula=>{
                const day = parseInt((aula.date as string).substr(8,2));
                const month = parseInt((aula.date as string).substr(5,2));
                const year = parseInt((aula.date as string).substr(0,4));
                aula.day = day;
                aula.month = month;
                aula.year = year;
                aula.onClickCallback = ()=>{openAulaModal(aula)};
                formatedAulas.push(aula);
            })

            setAulas(formatedAulas);
        })
    }

    return (
        <div>
            <ModalsProvider
                turmaId={id as string}
            />
            <header className="list-page-header">
                <h1 className="list-page-title">{turma.name as string}</h1>
                <button className="title-button" onClick={()=>{openAulaModal({})}}>
                    <GoPlus
                        className="title-button-icon"
                    />
                    Nova aula
                </button>
            </header>
            <div className="class-data-container">
                <div style={{display: "flex", alignItems: "baseline"}}>
                    <h1 className="list-page-subtitle">Dados da turma</h1>
                    <div className="class-edit-button" onClick={()=>{openEditTurmaModal(turma)}}>Editar</div>
                </div>
                <div className="class-data-body">
                    <div className="class-data-line">
                        <div className="class-data-line-content"><strong>Professoras:&nbsp;</strong>{turma.professoras as string}</div>
                    </div>
                    <div>
                    {turma.description ? <div className="class-data-line">
                        <div className="class-data-line-content"><strong>Descrição:&nbsp;</strong>{turma.description as string}</div>
                    </div>: ""}
                    </div>
                    <div>
                    {turma.informations ? <div className="class-data-line">
                        <div className="class-data-line-content"><strong>Informações adicionais:&nbsp;</strong>{turma.informations as string}</div>
                    </div>: ""}
                    </div>
                </div>
            </div>
            <div className="class-data-subcontainer">
                <div className="list-page-header">
                    <h1 className="list-page-subtitle">Alunas da turma</h1>
                    <button className="title-button" onClick={()=>{openAddStudentModal(turma)}}>
                        <GoPlus
                            className="title-button-icon"
                        />
                        Nova aluna
                    </button>
                </div>
                <div className="class-alunas-container">
                    {
                        turma.alunas ? (turma.alunas as Record<string, unknown>[]).map((aluna, index)=>{
                            return (
                                <div 
                                    className="student-card"
                                    style={{backgroundColor: index%2 === 0 ? "#F8E3FF" : "#F1C8FF"}}    
                                >
                                    <div className="student-card-title">{aluna.name as string}</div>
                                    <div>{`${aluna.birthDate ? moment().diff(moment(aluna.birthDate as string, 'YYYY-MM-DD').toDate(), 'years') : 10} anos`}</div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
            <div className="class-data-subcontainer">
                <Calendar
                    date={date}
                    aulas={aulas}
                    onChangeDateCallback={(date: Date)=>{
                        setDate(date);
                    }}
                    onClickDayCallback={(date) => openAulaModal(undefined, date)}
                />
            </div>
        </div>
    )
}