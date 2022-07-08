import moment from "moment";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Icon from "react-native-vector-icons/Ionicons"

import styles from "./styles"

interface ICalendarProps {
    date: Date;
    aulas: Record<string, unknown>[];
    onChangeDateCallback?: (date: Date) => void;
    onClickDayCallback?: (date: Date) => void;
    titleButton?: JSX.Element;
}

const simpleMode = true // mostrar apenas uma aula

export function Calendar(props: ICalendarProps) {
    const [calendar, setCalendar] = useState<Record<string, unknown>[]>([])
    const currentDay = moment().format("DD");
    const currentMonth = moment().format("MM");
    const currentYear = moment().format("yyyy");

    useEffect(() => {
        const calendar = [];
        const startDate = new Date(props.date.getFullYear(), props.date.getMonth(), 1);
        const endDate = new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0);
        const firstDayWeekIndex = startDate.getDay();
        const lastDayWeekIndex = endDate.getDay();
        const monthLastDay = endDate.getDate();
        for (let day = 0; day < firstDayWeekIndex; day++) {
            calendar.push({
                day: "",
            })
        }
        for (let day = 1; day <= monthLastDay; day++) {
            calendar.push({
                day: day,
                month: (startDate.getMonth() + 1),
                year: startDate.getFullYear(),
                date: new Date(startDate.getFullYear(), startDate.getMonth(), day)
            })
        }
        for (let day = lastDayWeekIndex + 1; day <= 6; day++) {
            calendar.push({
                day: "",
            })
        }

        setCalendar(calendar);
    }, [props.date])

    const renderHeader = () => {
        return (
            <View style={styles.calendarHeader}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.calendarTitle}>{moment(props.date).format("MMMM")}</Text>
                    {props.onChangeDateCallback && <View style={styles.calendarHeaderButtons}>
                        <Icon
                            onPress={() => {
                                const date = new Date(props.date.getFullYear(), props.date.getMonth() - 1, props.date.getDate());
                                props.onChangeDateCallback && props.onChangeDateCallback(date);
                            }}
                            name="chevron-back"
                            size={25}
                            style={{marginLeft: -10, marginRight: 10}}
                        />
                        <Icon
                            onPress={() => {
                                const date = new Date(props.date.getFullYear(), props.date.getMonth() + 1, props.date.getDate());
                                props.onChangeDateCallback && props.onChangeDateCallback(date);
                            }}
                            name="chevron-forward"
                            size={25}
                        />
                    </View>}
                </View>
                {props.titleButton && props.titleButton}
            </View>
        )
    }

    const renderBody = () => {
        const renderWeekDays = () => {
            return (
                <View style={{ display: "flex", flexDirection: "row" }}>
                    {
                        moment.weekdaysShort().map((weekDay, index) => {
                            return (
                                <Text
                                    key={weekDay}
                                    style={
                                        [
                                            {
                                                width: `${100 / 7}%`,
                                                backgroundColor: index % 7 === 0 ? "#F1C8FF" : "#F8E3FF",
                                                borderTopLeftRadius: index === 0 ? 10 : 0,
                                                borderTopRightRadius: index === 6 ? 10 : 0,
                                            },
                                            styles.calendarWeekDayHeaderItem
                                        ]
                                    }
                                >
                                    {weekDay}
                                </Text>
                            )
                        })
                    }
                </View>
            )
        }
        const renderDays = () => {
            const renderAulaDots = (day: Record<string, unknown>) => {
                const aulas = props.aulas.filter(aula => new Date(aula.date as string).getDate() === day.day)
                const rest = simpleMode ? aulas.splice(1) : aulas.splice(3)
                return (
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        {aulas.map(aula =>
                            <TouchableOpacity
                                key={aula._id as string}
                                style={[
                                    { backgroundColor: (aula.turma as Record<string, unknown>).color as string },
                                    styles.aulaMarker,
                                    simpleMode ? {width: "100%", backgroundColor: "#8538D2", borderRadius: 3} : {}
                                ]}
                            />
                        )}
                    </View>
                )
            }
            return (
                <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                    {
                        calendar.map((day, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={(e) => props.onClickDayCallback && day.date && props.onClickDayCallback(day.date as Date)}
                                    style={[
                                        styles.calendarDayBox,
                                        day.day === parseInt(currentDay) && day.year === parseInt(currentYear) && day.month === parseInt(currentMonth) ? styles.currentDay : {},
                                        {
                                            width: `${100 / 7}%`,
                                            backgroundColor: index % 7 === 0 ? "#F1C8FF" : "#F8E3FF",
                                            borderBottomLeftRadius: index === calendar.length - 7 ? 10 : 0,
                                            borderBottomRightRadius: index === calendar.length - 1 ? 10 : 0,
                                        }
                                    ]}
                                >
                                    <Text style={styles.calendarDayText}>
                                        {day.day as string}
                                    </Text>
                                    {renderAulaDots(day)}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            )
        }
        return (
            <View style={styles.calendarBody}>
                {renderWeekDays()}
                {renderDays()}
            </View>
        )
    }


    return (
        <View style={styles.calendar}>
            {renderHeader()}
            {renderBody()}
        </View>
    )
}