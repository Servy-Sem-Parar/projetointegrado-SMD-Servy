import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
//import 'react-native-gesture-handler';

const { Navigator, Screen } = createNativeStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator 
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Screen name="LandingPage" component={LandingPage} />
                <Screen name="LoginPage" component={LoginPage} />
                <Screen name="RegisterPage" component={RegisterPage} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;