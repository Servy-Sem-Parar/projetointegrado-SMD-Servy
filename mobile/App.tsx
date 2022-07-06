import { StatusBar } from 'expo-status-bar';
import AppStack from './src/routes/AppStack';
import 'moment/locale/pt-br';
import moment from 'moment';

export default function App() {
  moment.locale("pt-br")
  return (
    <>
      <AppStack />
      <StatusBar style="auto" />
    </>
  );
}
