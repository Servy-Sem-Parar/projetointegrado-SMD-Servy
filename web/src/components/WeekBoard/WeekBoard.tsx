import moment from "moment";
import { useEffect, useState } from "react";
import "./WeekBoard.css";

interface IWeekBoardProps {
    aulas: Record<string, unknown>[];
}

export function WeekBoard(props: IWeekBoardProps) {
    const [date] = useState(new Date());
    const [days, setDays] = useState<Record<string, unknown>[]>([]);

    useEffect(()=>{
        const days: Record<string, unknown>[] = [];
        let startOfWeek = moment(date).startOf('week').toDate()
        for (let i = 1; i <= 5; i++){
            const date = moment(startOfWeek).add(i, 'days')
            days.push({
                weekDay: date.format("ddd"),
                number: parseInt(date.format("DD")),
            })
        }
        setDays(days);
    }, [date])

    return (
        <div className="week-days-container">
            <div className="week-days-title">Aulas da semana</div>
            <div className="week-days-board">
                {
                    days.map(day=>{
                        return (
                            <div className="week-day">
                                <div className="week-day-title">{`${day.weekDay}, ${day.number}`}</div>
                                <div className="week-day-content">
                                    {
                                        props.aulas.map((aula=>{
                                            if(aula.day === day.number) {
                                                return (
                                                    <div onClick={() => aula.onClickCallback && (aula.onClickCallback as ()=>void)()} className="week-day-aula-card" style={{backgroundColor: (aula.turma as Record<string, string>).color}}>
                                                        <div className="week-day-aula-card-title">{aula.title as string}</div>
                                                        <div className="week-day-aula-card-subtitle">{`${aula.startHour as string}-${aula.endHour as string}`}</div>
                                                    </div>
                                                )
                                            }
                                        }))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}