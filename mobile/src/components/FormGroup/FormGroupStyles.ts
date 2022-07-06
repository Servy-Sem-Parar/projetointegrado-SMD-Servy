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
        marginBottom: 0,
        paddingRight: 5,
        borderRadius: 10,
        paddingLeft: 20,
    },

    multiSelectButton: {
        backgroundColor: "#F97E0D", 
        color: "white",
        borderRadius: 10,
    },

    searchInput: {
        fontSize: 20,
    },

    searchInputBox: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#F97E0D",
        paddingRight: 5,
        minHeight: 55,
    },

    selectButton: {
        borderRadius: 10
    },

    error: {
        color: "red",
        fontSize: 12,
        marginLeft: 8
    },

    inputView: {
        marginBottom: 20,
    },

    mainWrapper: {
        marginBottom: 0
    }
});