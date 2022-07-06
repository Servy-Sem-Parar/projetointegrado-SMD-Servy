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

    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
      marginTop: 30,
      marginBottom: 30,
      width:"100%",
      overflow: "scroll"
      //maxHeight: 700
    },

    titleText: {
      fontFamily: "Raleway_600SemiBold",
      fontSize: 25,
      marginBottom: 40
    },

    formBox: {
      width:"100%",
      padding: 30,
      display: "flex",
      //justifyContent: "center",
      alignItems: "center"
    },

    inputsBox:{
      width: "100%"
    },

    backContainer: {
      width: "100%",
      paddingTop: 20,
      paddingLeft: 20,
      marginBottom: -50
    },

    contentBox: {
      marginBottom: -20
    },
});

export default styles;