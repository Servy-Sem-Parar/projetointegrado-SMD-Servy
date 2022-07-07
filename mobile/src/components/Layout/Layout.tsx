import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./LayoutStyles";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

interface ILayoutProps {
    title: string,
    children: JSX.Element;
    activeTab: string;
    navigation: any
}

export function Layout(props: ILayoutProps) {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

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
    ]

    return (
        <View style={styles.layout}>
            {sideBarIsOpen && 
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
                                        setSideBarIsOpen(!sideBarIsOpen);                     
                                    }}
                                    name="chevron-back"
                                    size={40}
                                    style={styles.topBarIcon}
                                />
                            </View>
                        </View>
                        <View style={styles.itensContainer}>
                            {
                                pages.map(page=>{
                                    return (
                                        <TouchableOpacity style={page.name === props.activeTab ? styles.itemBoxActive : styles.itemBox} onPress={() => {
                                            setSideBarIsOpen(false); 
                                            props.navigation.navigate(page.page);           
                                        }}>
                                            <View style={styles.logoIconBox}>
                                                <Icon2
                                                    
                                                    name={page.icon}
                                                    size={30}
                                                    style={page.name === props.activeTab ? styles.itemIconActive : styles.itemIcon}
                                                />
                                            </View>
                                            <Text style={page.name === props.activeTab ? styles.itemLabelActive : styles.itemLabel}>{page.label}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            }
            <View style={styles.topBar}>
                <Icon
                    onPress={() => {
                        setSideBarIsOpen(!sideBarIsOpen);                     
                    }}
                    name="menu"
                    size={40}
                    style={styles.topBarIcon}
                />
                <Text style={styles.topBarTitle}>{props.title}</Text>
            </View>
            <View style={styles.pageContainer}>
                <ScrollView>
                {
                    props.children
                }
                </ScrollView>
            </View>
        </View>
    )
}