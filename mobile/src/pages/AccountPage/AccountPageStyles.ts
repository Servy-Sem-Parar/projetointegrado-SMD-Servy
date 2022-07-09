import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageTitle: {
        fontFamily: "Dosis_600SemiBold",
        fontSize: 30,
        marginBottom: 10
    },

    dataLine: {
        marginBottom: 8
    },

    dataBox: {
        //marginLeft: 10,
        //marginRight: 10,
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

    buttonsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    }
});

export default styles;