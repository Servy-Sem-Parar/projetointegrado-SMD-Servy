import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    calendarTitle: {
        fontSize: 35,
        marginBottom: 10,
        marginRight: 20,
        textTransform: "capitalize",
        fontFamily: "Dosis_700Bold",
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
        height: 9,
        width: 9,
        borderRadius: 10,
        marginRight: 3,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    aulaMarkerText: {
        color: "black",
        fontSize: 9,
        fontWeight: "bold"
    },
    currentDay: {
        shadowColor: "#111",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,

        elevation: 5,
    }

})

export default styles;