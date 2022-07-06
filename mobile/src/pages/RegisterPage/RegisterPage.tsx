import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../../components/Button/Button';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { containerStyles } from '../../styles/containerStyles';
import Icon from "react-native-vector-icons/Ionicons"

import styles from "./RegisterPageStyles";
import { useEffect, useState } from 'react';
import { getTurmas } from './requester';

export function RegisterPage({navigation}: {navigation: any}) {
    const [turmas, setTurmas] = useState<{label: string, value: string}[]>([]);

    useEffect(()=>{
        getTurmas().then(turmas=>{
            setTurmas(turmas);
        })
    }, [])

    return (
        <View style={containerStyles.page}>
            <ScrollView style={styles.container}>
                <View style={styles.backContainer}>
                    <Icon onPress={()=>{navigation.navigate("LandingPage")}} name="chevron-back" size={50}/>
                </View>
                <View style={styles.content} >
                    <View style={styles.content}>
                        <View style={styles.headerContent}>
                            <Text style={styles.logoMainText}>Projeto</Text>
                            <Text style={styles.logoSubText}>Sem Parar</Text>
                            <Text style={styles.logoSpanText}>Meninas ensinando meninas</Text>
                        </View>
                        <View style={styles.formBox}>
                            <Text style={styles.titleText}>Entre com seus dados</Text>
                            <View style={styles.inputsBox}>
                                <FormGroup
                                    placeholder='Nome e sobrenome'
                                    type="text"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                                <FormGroup
                                    placeholder='E-mail'
                                    type="text"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                                <FormGroup
                                    placeholder='Telefone'
                                    type="phone"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                                <FormGroup
                                    placeholder='Endereço'
                                    type="text"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                                <FormGroup
                                    placeholder='Tipo de escola'
                                    type="select"
                                    callback={(value: string)=>{console.log(value)}}
                                    options={[
                                        {label: "Pública", value: "public"},
                                        {label: "Particular", value: "private"},
                                    ]}
                                />
                                <FormGroup
                                    placeholder='Turmas'
                                    type="multiSelect"
                                    callback={(value: string)=>{console.log(value)}}
                                    options={turmas}
                                />
                                <FormGroup
                                    placeholder='Senha'
                                    type="password"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                                <FormGroup
                                    placeholder='Repita a senha'
                                    type="password"
                                    callback={(value: string)=>{console.log(value)}}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button
                                type={"primary"}
                                label={"Entrar"}
                                callback={()=>{navigation.navigate("LoginPage")}}
                            />
                        </View>
                    </View>
                </View>  
            </ScrollView>
        </View>
    )
}