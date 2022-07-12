import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageTitle: {
        fontFamily: "Dosis_700Bold",
        fontSize: 35,
        marginBottom: 10
    },
    dataLine: {
        marginBottom: 8
    },
    dataName: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 18,
        color: "#000000",
    },
    dataContent: {
        fontFamily: "Raleway_400Regular",
        fontSize: 18,
        color: "#000000"
    },
    materialCard: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    materialDataName: {
        fontFamily: "Raleway_600SemiBold",
        //fontSize: 18,
        color: "#ffffff",
    },
    materialDataContent: {
        fontFamily: "Raleway_400Regular",
        //fontSize: 13,
        color: "#ffffff"
    },
    noDataLabel: {
        marginTop: 20,
        marginBottom: 30,
        fontFamily: "Raleway_400Regular",
        textAlign: "center",
        fontSize: 18,
    }
});

export default styles;