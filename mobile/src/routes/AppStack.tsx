import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { RegisterFinishPage } from "../pages/RegisterFinishPage/RegisterFinishPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { useAuth } from "../context/Auth";
import AppLoading from "expo-app-loading";
import { navigationRef } from './RootNavigation';

const { Navigator, Screen } = createNativeStackNavigator();

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
            >
                {(authData ? privateRoutes : publicRoutes).map(route => 
                    <Screen key={route.name} name={route.name} component={route.component} />
                )}
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;