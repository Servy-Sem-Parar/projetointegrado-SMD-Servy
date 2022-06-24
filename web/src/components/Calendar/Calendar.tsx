import { useEffect, useState } from "react";
import { getMonthLabel } from "../../Tools/getMonthLabel";
import "./Calendar.css"

interface ICalendarProps {
    date: Date;
    markers: number[]
}

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export function Calendar(props: ICalendarProps) {
    const [calendar, setCalendar] = useState<Record<string, unknown>[]>([])

    useEffect(()=>{
        const calendar = [];
        const startDate = new Date(props.date.getFullYear(), new Date().getMonth(), 1);
        const endDate = new Date(props.date.getFullYear(), new Date().getMonth()+1, 0);
        const firstDayWeekIndex = startDate.getDay();
        const lastDayWeekIndex = endDate.getDay();
        const monthLastDay = endDate.getDate();
        for(let day = 0; day < firstDayWeekIndex; day++){
            calendar.push({
                day: "",
                hasAula: false
            })
        }
        for(let day = 1; day <= monthLastDay; day++){
            calendar.push({
                day: day,
                hasAula: props.markers.includes(day)
            })
        }
        for(let day = lastDayWeekIndex+1; day <= 6; day++){
            calendar.push({
                day: "",
                hasAula: false
            })
        }

        setCalendar(calendar);
    }, [props.date, props.markers])

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-title">{getMonthLabel(props.date.getMonth())}</div>
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
                                    //borderTopLeftRadius: index === 0 ? "10px" : "0px",
                                    //borderTopRightRadius: index === 6 ? "10px" : "0px",
                                    borderBottomLeftRadius: index === calendar.length-7 ? "10px" : "0px",
                                    borderBottomRightRadius: index === calendar.length-1 ? "10px" : "0px",
                                }} 
                                className="calendar-day-box"
                            >
                                <div className="calendar-day-text">
                                    {day.day as string}
                                </div>
                                <div>
                                    {day.hasAula as boolean && <div className="aula-marker"></div>}
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