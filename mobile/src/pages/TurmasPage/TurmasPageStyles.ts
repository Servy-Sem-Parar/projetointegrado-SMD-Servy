import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    turmasText: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 10,
    },
    turmasContainer: {
        display: "flex",
        flexDirection: "column",
    },
    turmaContainer: {
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 6,
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
        fontWeight: "bold",
        color: "#fff",
    },
    turmaProfessora: {
        fontSize: 20,
        color: "#fff",
        marginTop: -5
    }
});

export default styles;