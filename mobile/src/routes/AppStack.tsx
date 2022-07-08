import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { RegisterFinishPage } from "../pages/RegisterFinishPage/RegisterFinishPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { useAuth } from "../context/Auth";
import AppLoading from "expo-app-loading";
import { navigationRef } from './RootNavigation';
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { TurmasPage } from "../pages/TurmasPage/TurmasPage";
import { Sidebar } from "../components/Layout/Layout";
import { EditProfilePage } from "../pages/EditProfilePage/EditProfilePage";

const { Navigator, Screen } = createDrawerNavigator();

type Route = {
    name: string,
    component: React.ComponentType<any>
}

const publicRoutes: Route[] = [
    {name: "LandingPage", component: LandingPage},
    {name: "LoginPage", component: LoginPage},
    {name: "RegisterPage", component: RegisterPage},
    {name: "RegisterFinishPage", component: RegisterFinishPage},
]

const privateRoutes: Route[] = [
    {name: "HomePage", component: HomePage},
    {name: "AccountPage", component: AccountPage},
    {name: "TurmasPage", component: TurmasPage},
    {name: "EditProfilePage", component: EditProfilePage},
]

function AppStack() {
    const {authData, loading} = useAuth();

    if (loading) {
        return <AppLoading/>
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Navigator 
                screenOptions={{
                    headerShown: false,
                }}
                useLegacyImplementation={true}
                drawerContent={(props) => <Sidebar activeTab={props.state.routeNames[props.state.index]} navigation={props.navigation}/>}
            >
                {(authData ? privateRoutes : publicRoutes).map(route => {
                        return(
                            <Screen key={route.name} name={route.name} component={route.component} />
                        )
                    }
                )}
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;