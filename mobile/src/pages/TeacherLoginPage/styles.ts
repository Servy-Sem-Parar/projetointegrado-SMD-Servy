import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },

    logoImage: {
      flex: 1,
      width: "100%",
      
      resizeMode: 'contain'
    },

    secondaryButton: {
      borderRadius: 50,
      width: "100%",
      height: 50,
      backgroundColor: "#a780b9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3.84,
      elevation: 5,
    },

    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff"
    },

    input: {
      height: 50,
      width: "100%",
      borderRadius: 20,
      marginBottom: 30,
      borderColor: "#dddddd",
      borderWidth: 1,
      paddingLeft: 20
    },

    inputLabel: {
      fontSize: 17,
      fontWeight: "bold",
      width: "100%",
      marginBottom: 10,
    },

    titleText: {
      fontSize: 20,
      marginBottom: 50,
      fontWeight: "bold"
    }
});

export default styles;