import { View, Image, Text } from 'react-native';
import { Button } from '../../components/Button/Button';
import { containerStyles } from '../../styles/containerStyles';
import { styles } from './RegisterFinishPageStyles';
import Pesquisadora from "../../assets/pesquisadora.png";
import { Layout } from '../../components/Layout/Layout';

export function RegisterFinishPage({navigation}: {navigation: any}) {
    return (
        <Layout
            title={"Finish"}
            navigation={navigation} 
            hideBar={true}
            landing={true}
        >
        <View style={containerStyles.page}>
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={Pesquisadora}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleText}>Solicitação de cadastro realizada!</Text>
                        <Text style={styles.commonText}>Em breve você receberá notificado da situação do seu cadastro!</Text>
                    </View>
                    <Text style={styles.congratulationText}>Obrigado por acreditar no <Text style={styles.logoText}>Projeto Sem Parar</Text>!</Text>
                    <Button
                        type={"primary"}
                        label={"Concluir"}
                        callback={()=>{
                            navigation.navigate("LoginPage");        
                        }}
                    />
                </View>
            </View>
        </View>
        </Layout>
    )
}