import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button/Button';
import { buttonStyles } from '../../components/Button/ButtonsStyles';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { containerStyles } from '../../styles/containerStyles';
import Icon from "react-native-vector-icons/Ionicons"

import styles from "./LoginPageStyles";

export function LoginPage({navigation}: {navigation: any}) {

    return (
        <View style={containerStyles.page}>
            <View style={styles.container}>
                <View style={styles.backContainer}>
                    <Icon onPress={()=>{navigation.navigate("LandingPage")}} name="chevron-back" size={50}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.logoMainText}>Projeto</Text>
                            <Text style={styles.logoSubText}>Sem Parar</Text>
                            <Text style={styles.logoSpanText}>Meninas ensinando meninas</Text>
                        </View>
                        <View style={styles.formBox}>
                            <Text style={styles.titleText}>Acesse sua conta</Text>
                            <View style={styles.inputsBox}>
                                <FormGroup
                                    placeholder='E-mail'
                                    type="text"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                                <FormGroup
                                    placeholder='Senha'
                                    type="password"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                            </View>
                        </View>
                        <View>
                            <Button
                                type={"primary"}
                                label={"Entrar"}
                                callback={()=>{navigation.navigate("LoginPage")}}
                            />
                        </View>
                    </View>
                </View>  
            </View>
        </View>
    )
}