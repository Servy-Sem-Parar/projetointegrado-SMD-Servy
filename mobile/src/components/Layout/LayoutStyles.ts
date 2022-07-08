import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    layout: {
        width: "100%",
        position: "relative",
        height: "100%",
    },

    sideMenu: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10
    },

    loader: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10
    },

    sideBar: {
        width: 280,
        height: "100%",
        backgroundColor: "#FAEAFF",
        paddingTop: 20
    },

    pageContainer: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        width: "100%",
        height: "100%",
    },

    fadeContainer: {
        marginTop: -1,
        width: "100%",
        height: "100%",
    },

    topBar: {
        backgroundColor: "#E4BDFE",
        width: "100%",
        padding: 15,
        paddingLeft: 30,
        display: "flex",
        flexDirection: "row"
    },

    topBarTitle: {
        fontFamily: "Dosis_600SemiBold",
        fontSize: 30
    },

    topBarIcon: {
        marginLeft: -10, 
        marginRight: 20
    },

    logoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    logo: {
        paddingLeft: 25,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "white",
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
    },

    logoMainText: {
        color: "#F97E0D",
        fontFamily: "Raleway_400Regular",
        fontSize: 25
    },

    logoSubText: {
        color: "#8538D2",
        fontFamily: "Raleway_600SemiBold",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: -10
    },

    logoIconBox: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },

    itensContainer: {
        marginTop: 20,
        position: "relative",
        display: "flex",
        flex: 1
    },

    itemBox: {
        width: "100%",
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row"
    },

    itemBoxLogout: {
        width: "100%",
        paddingLeft: 20,
        paddingTop: 10,
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: 20
    },

    itemBoxActive: {
        borderRightWidth: 3,
        borderRightColor: "#F97E0D",
        width: "100%",
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row"
    },

    itemLabel: {
        fontFamily: "Raleway_400Regular",
        color: "#37352F",
        fontSize: 17
    },

    itemLabelActive: {
        fontFamily: "Raleway_600SemiBold",
        color: "#F97E0D",
        fontSize: 17
    },

    itemIcon: {
        color: "#37352F",
        marginRight: 15
    },

    itemIconActive: {
        color: "#F97E0D",
        marginRight: 15
    },
});

export default styles;