import moment from "moment";
import { useEffect, useState } from "react";
import "./WeekBoard.css";

interface IWeekBoardProps {
    aulas: Record<string, unknown>[];
}

const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX"];

export function WeekBoard(props: IWeekBoardProps) {
    const [date] = useState(new Date(2022, 7, 5));
    const [days, setDays] = useState<Record<string, unknown>[]>([]);

    useEffect(()=>{
        const days: Record<string, unknown>[] = [];
        let startOfWeek = moment().startOf('week').toDate().getDate()+1;
        const endOfWeek = moment().endOf('week').toDate().getDate()-1;
        const weekDaysNumber = [];
        let monthLastDay: number; 
        
        if(endOfWeek < startOfWeek) {
            monthLastDay = startOfWeek+4-endOfWeek;
        } else {
            monthLastDay = moment().endOf('month').toDate().getDate();
        }
        
        for(let day = 0; day < 5; day++) {
            if(weekDaysNumber.length < 5) {
                weekDaysNumber.push(startOfWeek+day);
                if(startOfWeek+day === monthLastDay) {
                    day = 0;
                    startOfWeek = 0;
                }
            }
        }

        weekDaysNumber.forEach((day, index)=>{
            days.push({
                weekDay: weekDays[index],
                number: day,
            })
        })
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