import moment from "moment";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getMonthLabel } from "../../Tools/getMonthLabel";
import "./Calendar.css"

interface ICalendarProps {
    date: Date;
    aulas: Record<string, unknown>[];
    onChangeDateCallback?: (date: Date)=>void;
    onClickDayCallback?: (date: Date)=>void;
    titleButton?: JSX.Element;
}

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export function Calendar(props: ICalendarProps) {
    const [calendar, setCalendar] = useState<Record<string, unknown>[]>([])
    const currentDay = moment().format("DD");
    const currentMonth = moment().format("MM");
    const currentYear = moment().format("yyyy");

    useEffect(()=>{
        const calendar = [];
        const startDate = new Date(props.date.getFullYear(), props.date.getMonth(), 1);
        const endDate = new Date(props.date.getFullYear(), props.date.getMonth()+1, 0);
        const firstDayWeekIndex = startDate.getDay();
        const lastDayWeekIndex = endDate.getDay();
        const monthLastDay = endDate.getDate();
        for(let day = 0; day < firstDayWeekIndex; day++){
            calendar.push({
                day: "",
            })
        }
        for(let day = 1; day <= monthLastDay; day++){
            calendar.push({
                day: day,
                month: (startDate.getMonth()+1),
                year: startDate.getFullYear(),
                date: new Date(startDate.getFullYear(), startDate.getMonth(), day)
            })
        }
        for(let day = lastDayWeekIndex+1; day <= 6; day++){
            calendar.push({
                day: "",
            })
        }

        setCalendar(calendar);
    }, [props.date])

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div style={{display: "flex"}}>
                    <div className="calendar-title">{getMonthLabel(props.date.getMonth())}</div>
                    {props.onChangeDateCallback && <div className="calendar-header-buttons">
                        <GrFormPrevious
                            className="calendar-header-button"
                            onClick={()=>{
                                const date = new Date(props.date.getFullYear(), props.date.getMonth()-1, props.date.getDate());
                                props.onChangeDateCallback &&props.onChangeDateCallback(date);
                            }}
                        />
                        <GrFormNext
                            className="calendar-header-button"
                            onClick={()=>{
                                const date = new Date(props.date.getFullYear(), props.date.getMonth()+1, props.date.getDate());
                                props.onChangeDateCallback &&props.onChangeDateCallback(date);
                            }}
                        /> 
                    </div>}
                </div>
                {props.titleButton && props.titleButton}
            </div>
            <div className="calendar-body">
                <div style={{display: "flex"}}>
                {
                    weekDays.map((weekDay, index)=>{
                        return (
                            <div 
                                style={{
                                    width: `${100/7}%`,
                                    backgroundColor: index%7 === 0 ? "#F1C8FF" : "#F8E3FF",
                                    borderTopLeftRadius: index === 0 ? "10px" : "0px",
                                    borderTopRightRadius: index === 6 ? "10px" : "0px",
                                }} 
                                className="calendar-weekday-header-item"
                            >
                                {weekDay}
                            </div>
                        )
                    })
                }
                </div>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                {
                    calendar.map((day, index)=>{
                        return (
                            <div 
                                style={{
                                    width: `${100/7}%`,
                                    backgroundColor: index%7 === 0 ? "#F1C8FF" : "#F8E3FF",
                                    borderBottomLeftRadius: index === calendar.length-7 ? "10px" : "0px",
                                    borderBottomRightRadius: index === calendar.length-1 ? "10px" : "0px",
                                }} 
                                onClick={(e) => props.onClickDayCallback && day.date && props.onClickDayCallback(day.date as Date)}
                                className={`calendar-day-box ${(day.day === parseInt(currentDay) && day.year === parseInt(currentYear) && day.month === parseInt(currentMonth)) ? "current-day" : ""}`}
                            >
                                <div className="calendar-day-text">
                                    {day.day as string}
                                </div>
                                <div style={{ overflowY: "auto", maxHeight: "100%", overflowX: "hidden"}}>
                                    {props.aulas.map(aula=>{
                                        if(aula.day === day.day) {
                                            return <div
                                                className="aula-marker"
                                                onClick={(e)=>{
                                                    e.stopPropagation()
                                                    aula.onClickCallback && (aula.onClickCallback as ()=>void)();
                                                }}
                                                style={{
                                                    width: "100%",
                                                    marginRight: "5px",
                                                    marginBottom: "5px",
                                                    backgroundColor: (aula.turma as Record<string, unknown>).color as string
                                                }}
                                            >
                                                <div className="aula-name">
                                                    {aula.title as string}
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}