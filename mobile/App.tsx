import { StatusBar } from 'expo-status-bar';
import AppStack from './src/routes/AppStack';
import 'moment/locale/pt-br';
import moment from 'moment';
import AppLoading from "expo-app-loading";
import {useFonts, Dosis_400Regular, Dosis_600SemiBold} from "@expo-google-fonts/dosis"
import {Raleway_400Regular, Raleway_600SemiBold} from "@expo-google-fonts/raleway"
import { Text, StyleSheet, SafeAreaView } from 'react-native';
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
      <SafeAreaView style={styles.safeArea}>
        <Text></Text>
        <AppStack />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 30},
  safeArea: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#C489EC"
  }
});
