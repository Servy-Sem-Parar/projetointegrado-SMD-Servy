import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "#F97E0D",
        width: "100%",
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        fontSize: 20,
        color: "black",
        marginBottom: 20,
    },

    phoneInput: {
        borderWidth: 2,
        borderColor: "#F97E0D",
        width: "100%",
        borderRadius: 10,
        //padding: 10,
        //paddingLeft: 20,
        padding: 0,
        maxHeight: 55,
        marginBottom: 20,
    },

    phoneTextInput: {
        fontSize: 20,
        padding: 0,
        margin: 0,
        minHeight: 55,
        alignItems: "center",
    },

    phoneCodeText: {
        fontSize: 20,
        padding: 0,
        minHeight: 30,
        margin: 0,
        alignItems: "center",
        textAlign: "center",
    },

    phoneTextInputContainer: {
        padding: 0,
        margin: 0,
        height: "auto",
        borderRadius: 10,
    },

    phoneButtonInput: {
        padding: 0,
        margin: 0,
        alignItems: "center",
    },

    dropdownMenuText: {
        fontSize: 20,
        borderRadius: 10,
    },

    dropdownMenuTextUnset: {
        fontSize: 20,
        borderRadius: 10,
        color: "#999999"
    },

    dropdownMenu: {
        height: 55,
        borderWidth: 2,
        borderColor: "#F97E0D",
        borderRadius: 10,
        paddingLeft: 20,
    }
});