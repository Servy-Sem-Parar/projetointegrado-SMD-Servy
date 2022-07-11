import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Button } from '../../components/Button/Button';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { containerStyles } from '../../styles/containerStyles';
import Icon from "react-native-vector-icons/Ionicons"
import styles from "./LoginPageStyles";
import { useEffect, useState } from 'react';
import { storage } from '../../Tools/storage';
import { makeConnection } from '../../Tools/makeConnection';
import { useAuth } from '../../context/Auth';
import { Layout } from '../../components/Layout/Layout';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export function LoginPage({navigation}: {navigation: any}) {
    const [entity, setEntity] = useState<Record<string, unknown>>({});
    const [validations, setValidations] = useState<Record<string, unknown>>({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {signIn} = useAuth();
    const callback = (field: string, value: string | string[])=>{
        const newEntity = {...entity};
        newEntity[field] = value;
        setEntity(newEntity);
    }

    const validationCallback = (field: string, value: string | string[] | null)=>{
        const newValidations = {...validations};
        newValidations[field] = value;
        setValidations(newValidations);
    }

    return (
        <Layout
            title={"Login"}
            navigation={navigation} 
            hideBar={true}
            landing={true}
        >
            <ForgotPasswordModal
                isOpen={modalIsOpen}
                closeModalFunction={()=>{setModalIsOpen(false)}}
            />
        <View style={containerStyles.page}>
            <View style={styles.container}>
                <View style={styles.backContainer}>
                    <Icon onPress={()=>{navigation.navigate("LandingPage")}} name="chevron-back" size={50}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.content}>
                        <View style={styles.contentBox}>
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
                                    errorMessage={validations.email as string}
                                    callback={(value: string | string[])=>{
                                        callback("email", value);
                                    }}
                                />
                                <FormGroup
                                    placeholder='Senha'
                                    type="password"
                                    errorMessage={validations.password as string}
                                    callback={(value: string | string[])=>{
                                        callback("password", value);
                                        validationCallback("password", "");
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <Button
                                type={"primary"}
                                label={"Entrar"}
                                callback={async ()=>{
                                    const response = await makeConnection({
                                        method: "post",
                                        suffix: "auth/login",
                                        body: entity
                                      });
                                      if(response?.data.user.role === "teacher" || response?.data.user.role === "admin" || response?.data.user.status === "pending" || response?.data.user.status === "disapproved") {
                                        Alert.alert("OOPS!", "Seu pedido de cadastro ainda não foi aprovado.", [{
                                            text: "Entendi", onPress: ()=>{console.log("alert closed")}
                                        }]);
                                      } else if(response?.data.user) {
                                        signIn({token: `Bearer ${response.data.token}`, ...response.data.user})
                                      }
                                    
                                }}
                            />
                            <Button
                                type={"span"}
                                label={"Esqueci minha senha"}
                                callback={()=>{
                                    setModalIsOpen(true)
                                }}
                            />
                        </View>
                    </View>
                </View>  
            </View>
        </View>
        </Layout>
    )
}