import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    turmaTextContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'baseline',
    },
    turmasText: {
        //fontWeight: "bold",
        fontSize: 35,
        fontFamily: "Dosis_700Bold",
        marginBottom: 10,
    },
    turmasSubText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#8010F0",
        paddingBottom: 6,
        fontFamily: "Raleway_400Regular",
    },
    turmasContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingBottom: 10
    },
    turmaIcon: {
        color: "#fff",
        fontSize: 70
    },
    turmaBox: {
        borderRadius: 10,
        width: 100,
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    turmaContainer: {
        display: "flex",
        marginRight: 10,
        alignItems: "center",
        marginBottom: 20
    },
    turmaText: {
        fontSize: 12,
        fontFamily: "Raleway_400Regular",
    }
});

export default styles;