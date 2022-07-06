import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { RegisterFinishPage } from "../pages/RegisterFinishPage/RegisterFinishPage";
import { HomePage } from "../pages/HomePage/HomePage";
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
                <Screen name="RegisterFinishPage" component={RegisterFinishPage} />
                <Screen name="HomePage" component={HomePage} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;