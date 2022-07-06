import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center"
    },

    logoMainText: {
      fontFamily: "Raleway_400Regular",
      color: "#F97E0D",
      fontSize: 40,
      marginBottom: -25
    },

    logoSubText: {
      fontFamily: "Raleway_600SemiBold",
      color: "#8010F0",
      fontSize: 55,
      marginBottom: -10
    },

    logoSpanText: {
      fontFamily: "Raleway_400Regular",
      color: "#F97E0D",
      fontSize: 20,
    },

    logoContainer: {
      display: "flex",
      alignItems: 'center',
    },

    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
      marginBottom: 30,
      maxHeight: 600
    },
});

export default styles;