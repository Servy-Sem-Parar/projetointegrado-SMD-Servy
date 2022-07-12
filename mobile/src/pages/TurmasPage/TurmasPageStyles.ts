import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    turmasText: {
        //fontWeight: "bold",
        fontSize: 28,
        marginBottom: 10,
        fontFamily: "Dosis_700Bold",
    },
    turmasContainer: {
        display: "flex",
        flexDirection: "column",
    },
    turmaContainer: {
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 8,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    turmaIcon: {
        fontSize: 55,
        color: "#fff",
        marginRight: 10
    },
    turmaName: {
        fontSize: 25,
        color: "#fff",
        fontFamily: "Dosis_600SemiBold",
    },
    turmaProfessora: {
        fontSize: 20,
        color: "#fff",
        marginTop: -5,
        fontFamily: "Dosis_400Regular",
    }
});

export default styles;