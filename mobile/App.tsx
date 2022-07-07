import { StatusBar } from 'expo-status-bar';
import AppStack from './src/routes/AppStack';
import 'moment/locale/pt-br';
import moment from 'moment';
import AppLoading from "expo-app-loading";
import {useFonts, Dosis_400Regular, Dosis_600SemiBold} from "@expo-google-fonts/dosis"
import {Raleway_400Regular, Raleway_600SemiBold} from "@expo-google-fonts/raleway"
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from './src/context/Auth';

export default function App() {
  moment.locale("pt-br")
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
    <AuthProvider>
      <AppStack />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 30}
});
