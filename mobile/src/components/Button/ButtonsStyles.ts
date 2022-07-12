import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
    primaryButton: {
        backgroundColor: "#F97E0D",        
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 10,  
        paddingBottom: 10, 
        paddingRight: 20,  
        paddingLeft: 20,  
        minWidth: 200,       
    },

    primaryButtonLabel: {
        fontFamily: "Dosis_600SemiBold",
        fontSize: 25,
        textAlign: "center",
        color: "white",
        marginTop: -3
    },

    spanButton: {
        backgroundColor: "transparent",
        marginTop: 20,
        paddingTop: 10,  
        paddingBottom: 10, 
        paddingRight: 20,  
        paddingLeft: 20,         
        borderRadius: 20,
        height: 60,
    },

    spanButtonLabel: {
        fontFamily: "Raleway_400Regular",
        fontSize: 20,
        textAlign: "center",
        color: "#8010F0",
        marginTop: -8,
        margin: "auto",
        minWidth: 200, 
    }
});