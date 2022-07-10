import { View, Text } from 'react-native';
import { Button } from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';
import { containerStyles } from '../../styles/containerStyles';

import styles from "./LandingPageStyles";

export function LandingPage({navigation}: {navigation: any}) {
    return (
        <Layout
            title={"Landing"}
            navigation={navigation} 
            hideBar={true}
            landing={true}
        >
        <View style={containerStyles.page}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.logoMainText}>Projeto</Text>
                        <Text style={styles.logoSubText}>Sem Parar</Text>
                        <Text style={styles.logoSpanText}>Meninas ensinando meninas</Text>
                    </View>
                    <View>
                        <Button
                            type={"primary"}
                            label={"Entrar"}
                            callback={()=>{navigation.navigate("LoginPage")}}
                        />
                        <Button
                            type={"span"}
                            label={"Cadastrar-se"}
                            callback={()=>{navigation.navigate("RegisterPage")}}
                        />
                    </View>
                </View>
            </View>
        </View>
        </Layout>
    )
}