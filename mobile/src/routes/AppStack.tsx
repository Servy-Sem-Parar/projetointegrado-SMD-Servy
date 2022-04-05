import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../pages/LandingPage";
import TeacherLoginPage from "../pages/TeacherLoginPage";
import StudentLoginPage from "../pages/StudenLoginPage";
//import 'react-native-gesture-handler';

const { Navigator, Screen } = createNativeStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="LandingPage" component={LandingPage} />
                <Screen name="TeacherLoginPage" component={TeacherLoginPage} />
                <Screen name="StudentLoginPage" component={StudentLoginPage} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;