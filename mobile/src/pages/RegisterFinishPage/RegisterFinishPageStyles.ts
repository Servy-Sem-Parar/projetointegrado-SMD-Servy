import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: "center"
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 40,
        paddingBottom: 40
    },

    titleText: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 22,
        marginBottom: 40,
        textAlign: "center",
    },

    commonText: {
        fontFamily: "Raleway_400Regular",
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
    },

    congratulationText: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 25,
        marginBottom: 40,
        textAlign: "center",
        color: "#6E0BD7"
    },

    logoText: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 25,
        marginBottom: 40,
        textAlign: "center",
        color: "#F97E0D"
    },

    mainContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%"
    },

    imageContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFE2C8",
        borderRadius: 10
    },

    image: {
        width: 100,
        height: 100
    },
})