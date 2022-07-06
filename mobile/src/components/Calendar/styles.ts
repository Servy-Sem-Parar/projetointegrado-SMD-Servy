import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    calendarTitle: {
        fontWeight: "bold",
        fontSize: 40,
        marginBottom: 10,
        marginRight: 20,
        textTransform: "capitalize"
    },
    calendar: {
        width: "100%",
        paddingBottom: 10
    },
    calendarBody: {
        width: "100%",
    },
    calendarDayBox: {
        height: 55,
        backgroundColor: "#f8e3ff",
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
        flexDirection: "column",
        display: "flex",
    },
    calendarWeekDayHeaderItem: {
        backgroundColor: "#f8e3ff",
        padding: 5,
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    calendarHeader: {
        justifyContent: "space-between",
        display: "flex"
    },
    calendarHeaderButtons: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    calendarDayText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    aulaMarker: {
        height: 10,
        width: 10,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 5,
        marginBottom: 5,
    },
    currentDay: {
    }

})

export default styles;