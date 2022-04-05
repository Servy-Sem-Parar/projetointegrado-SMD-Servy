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

    button: {
      borderRadius: 50,
      width: "100%",
      height: 50,
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

    primaryButton: {
      backgroundColor: "#fd9b14",
      marginBottom: 20,
    },

    secondaryButton: {
      backgroundColor: "#a780b9",
    },

    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff"
    },

    mainText: {
      fontSize: 18,
      fontWeight: "bold",
      width: "100%",
      marginBottom: 20,
    }
});

export default styles;