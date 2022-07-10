import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        maxHeight: "65%",
        height: "65%",
        width: "70%",
        position: "relative",

    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "flex-end"
    },
    aulaTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    aulaBola: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 10
    },
    aulaTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
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
    dataLink: {
        color: "blue",
        textDecorationLine: "underline",
    },
    dataLine: {
        marginTop: 8,
    },
    materialCard: {
        padding: 5,
        paddingHorizontal: 10,
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
});

export default styles;