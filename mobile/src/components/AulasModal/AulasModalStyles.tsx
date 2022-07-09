import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        maxHeight: "70%",
        height: "70%",
        width: "80%",
        position: "relative"
    },
    dateTextContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    dateTextDay: {
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: "Dosis_600SemiBold"
    },
    dateTextWeek: {
        fontSize: 14,
        textTransform: "capitalize",
        marginTop: -5
    },
    aulasContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
        flex: 1,
    },
    aulaContainer: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
    },
    aulaBola: {
        width: 15,
        height: 15,
        borderRadius: 15,
        marginTop: 8
    },
    aulaTextContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10,
    },
    aulaTitle: {
        fontSize: 18,
        fontWeight: "700",
        textDecorationLine: "underline",
        color: "#7000E0",
    },
    aulaTurma: {
        marginTop: -2,
    },
    aulaHorario: {
        marginTop: -2,
    },
    buttonContainer: {
        position: "absolute",
        right: 5
    },
    primaryButton: {
        //backgroundColor: "#F97E0D",        
        //borderRadius: 15,
        //shadowOffset: {
        //    width: 0,
        //    height: 2,
        //},
        //shadowOpacity: 0.7,
        //shadowRadius: 3.84,
        //elevation: 5,
        paddingTop: 13,  
        paddingBottom: 10, 
        width: "100%",
        paddingRight: 10,  
        paddingLeft: 10,  
        //marginTop: 20,
        minWidth: 200,       
    },
    primaryButtonLabel: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 15,
        textAlign: "center",
        //color: "white",

        textDecorationLine: "underline",
        color: "#8010F0",
        marginTop: -8
    },
    linkContainer: {
        width: "100%",
        display: "flex",
        //justifyContent: "flex-end",
       // flexDirection: "row"
    }
});

export default styles;