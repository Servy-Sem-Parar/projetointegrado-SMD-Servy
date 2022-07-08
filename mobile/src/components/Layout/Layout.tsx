import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styles from "./LayoutStyles";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { useAuth } from "../../context/Auth";

interface ILayoutProps {
    title: string,
    children: JSX.Element | JSX.Element[];
    navigation: any,
    refreshControl?: JSX.Element
}

export function Layout(props: ILayoutProps) {
    return (
        <View style={styles.layout}>
            <View style={styles.topBar}>
                <Icon
                    onPress={() => {
                        props.navigation.toggleDrawer();
                    }}
                    name="menu"
                    size={40}
                    style={styles.topBarIcon}
                />
                <Text style={styles.topBarTitle}>{props.title}</Text>
            </View>
            <ScrollView style={styles.pageContainer} refreshControl={props.refreshControl}>
                <View>
                    {
                        props.children
                    }
                </View>
            </ScrollView>
        </View>
    )
}

type SidebarProps = {
    navigation: any,
    activeTab: string,
}

export function Sidebar(props: SidebarProps) {

    const {signOut} = useAuth()

    const pages = [
        {
            name: "home",
            label: "Início",
            icon: "home",
            page: "HomePage"
        },
        {
            name: "turmas",
            label: "Turmas",
            icon: "view-list-outline",
            page: "TurmasPage"
        },
        {
            name: "profile",
            label: "Meu perfil",
            icon: "account-circle",
            page: "AccountPage"
        },
        {
            name: "logout",
            label: "Sair",
            icon: "exit-to-app",
            logout: true,
            onClick: () => {
                props.navigation.closeDrawer()
                signOut()
            }
        },
    ]
    return (
        <View style={styles.sideMenu}>
            <View style={styles.sideBar}>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Text style={styles.logoMainText}>Projeto</Text>
                        <Text style={styles.logoSubText}>Sem Parar</Text>
                    </View>
                    <View style={styles.logoIconBox}>
                        <Icon
                            onPress={() => {
                                props.navigation.toggleDrawer();
                            }}
                            name="chevron-back"
                            size={40}
                            style={styles.topBarIcon}
                        />
                    </View>
                </View>
                <View style={styles.itensContainer}>
                    {
                        pages.map(page => {
                            return (
                                <TouchableOpacity
                                    key={page.name}
                                    style={page.logout ? styles.itemBoxLogout : page.page === props.activeTab ? styles.itemBoxActive : styles.itemBox}
                                    onPress={() => {
                                        page.onClick ? page.onClick() : props.navigation.navigate(page.page);
                                    }}
                                >
                                    <View style={styles.logoIconBox}>
                                        <Icon2
                                            name={page.icon}
                                            size={30}
                                            style={page.page === props.activeTab ? styles.itemIconActive : styles.itemIcon}
                                        />
                                    </View>
                                    <Text style={page.page === props.activeTab ? styles.itemLabelActive : styles.itemLabel}>{page.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}