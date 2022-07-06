import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../../components/Button/Button';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { containerStyles } from '../../styles/containerStyles';
import Icon from "react-native-vector-icons/Ionicons"
import styles from "./RegisterPageStyles";
import { useEffect, useState } from 'react';
import { getTurmas, createEntity } from './requester';
import { validateAllInputs, validateInput } from '../../Tools/validateInputs';
import { Alert } from "react-native";

export function RegisterPage({navigation}: {navigation: any}) {
    const [turmas, setTurmas] = useState<{label: string, value: string}[]>([]);
    const [userInfo, setUserInfo] = useState<Record<string, unknown>>({});
    const [validations, setValidations] = useState<Record<string, unknown>>({});

    const callback = (field: string, value: string | string[])=>{
        const newInfo = {...userInfo};
        newInfo[field] = value;
        setUserInfo(newInfo);
    }

    const validationCallback = (field: string, value: string | string[] | null)=>{
        const newValidations = {...validations};
        newValidations[field] = value;
        setValidations(newValidations);
    }

    const fieldValidations = {
        name: ["mandatory"],
        password: ["password", "mandatory"],
        retypePassword: ["matchValue", "mandatory"],
        email: ["mandatory"],
        phone_number: [],
        wantedTurmas: ["mandatoryArray"],
        address: ["mandatory"],
        schoolType: ["mandatory"],
        birthDate: ["date"]
    }

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
                                    errorMessage={validations.name as string}
                                    callback={(value: string | string[])=>{
                                        callback("name", value);
                                        const error = validateInput(value, fieldValidations.name)
                                        validationCallback("name", error);
                                    }}
                                />
                                <FormGroup
                                    placeholder='Data de nascimento'
                                    type="date"
                                    errorMessage={validations.birthDate as string}
                                    callback={(value: string | string[])=>{
                                        callback("birthDate", value);
                                        const error = validateInput(value, fieldValidations.birthDate)
                                        validationCallback("birthDate", error);
                                    }}
                                />
                                <FormGroup
                                    placeholder='E-mail'
                                    type="text"
                                    errorMessage={validations.email as string}
                                    callback={(value: string | string[])=>{
                                        callback("email", value);
                                        const error = validateInput(value, fieldValidations.email)
                                        validationCallback("email", error);
                                    }}
                                />
                                <FormGroup
                                    placeholder='Telefone'
                                    type="phone"
                                    errorMessage={validations.phone as string}
                                    callback={(value: string | string[])=>{
                                        callback("phone_number", value);
                                        const error = validateInput(value, fieldValidations.phone_number)
                                        validationCallback("phone_number", error);
                                    }}
                                />
                                <FormGroup
                                    placeholder='Endereço'
                                    type="text"
                                    errorMessage={validations.address as string}
                                    callback={(value: string | string[])=>{
                                        callback("address", value);
                                        const error = validateInput(value, fieldValidations.address)
                                        validationCallback("address", error);
                                    }}
                                />
                                <FormGroup
                                    placeholder='Tipo de escola'
                                    type="select"
                                    errorMessage={validations.schoolType as string}
                                    callback={(value: string | string[])=>{
                                        callback("schoolType", value);
                                        const error = validateInput(value, fieldValidations.schoolType)
                                        validationCallback("schoolType", error);
                                    }}
                                    options={[
                                        {label: "Pública", value: "public"},
                                        {label: "Particular", value: "private"},
                                    ]}
                                />
                                <FormGroup
                                    placeholder='Turmas'
                                    type="multiSelect"
                                    errorMessage={validations.wantedTurmas as string}
                                    callback={(value: string | string[])=>{
                                        callback("wantedTurmas", value);
                                        const error = validateInput(value, fieldValidations.wantedTurmas)
                                        validationCallback("wantedTurmas", error);
                                    }}
                                    options={turmas}
                                />
                                <FormGroup
                                    placeholder='Senha'
                                    type="password"
                                    errorMessage={validations.password as string}
                                    callback={(value: string | string[])=>{
                                        callback("password", value);
                                        const error = validateInput(value, fieldValidations.password)
                                        validationCallback("password", error)
                                    }}
                                />
                                <FormGroup
                                    placeholder='Repita a senha'
                                    type="password"
                                    errorMessage={validations.retypePassword as string}
                                    callback={(value: string | string[])=>{
                                        callback("retypePassword", value);
                                        const error = validateInput(value, fieldValidations.retypePassword, userInfo.password as string)
                                        validationCallback("retypePassword", error);
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button
                                type={"primary"}
                                label={"Concluir"}
                                callback={()=>{
                                    const validations = {...fieldValidations};
                                    validations.retypePassword = [];
                                    console.log(userInfo);
                                    const validationResult = validateAllInputs({entity: userInfo, validations});
                                    if(validationResult.success) {
                                        createEntity(userInfo).then(success=>{
                                            console.log(success);
                                        })
                                    } else {
                                        setValidations(validationResult.errors);
                                        Alert.alert("OOPS!", "Um ou mais campos não estão preenchidos corretamente.", [{
                                            text: "Entendi", onPress: ()=>{console.log("alert closed")}
                                        }]);
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>  
            </ScrollView>
        </View>
    )
}