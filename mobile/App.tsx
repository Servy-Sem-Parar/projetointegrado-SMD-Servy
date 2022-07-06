import { StatusBar } from 'expo-status-bar';
import AppStack from './src/routes/AppStack';
import AppLoading from "expo-app-loading";
import {useFonts, Dosis_400Regular, Dosis_600SemiBold} from "@expo-google-fonts/dosis"
import {Raleway_400Regular, Raleway_600SemiBold} from "@expo-google-fonts/raleway"
import { View, StyleSheet } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Dosis_400Regular,
    Dosis_600SemiBold,
    Raleway_400Regular,
    Raleway_600SemiBold
  }) 

  if(!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <>
      <AppStack />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 30}
});
