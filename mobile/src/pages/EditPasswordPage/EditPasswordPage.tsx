import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useAuth } from "../../context/Auth";
import styles from "./EditPasswordPageStyles";
import { editPassword } from "./requester";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "../../components/Button/Button";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { validateAllInputs, validateInput } from "../../Tools/validateInputs";
import { Layout } from "../../components/Layout/Layout";

export function EditPasswordPage({navigation}: {navigation: any}) {
    const [userId, setUserId] = useState("");
    const [passwordData, setPasswordData] = useState<Record<string, unknown>>({});
    const { authData } = useAuth();
    const [validations, setValidations] = useState<Record<string, unknown>>({});

    const callback = (field: string, value: string | string[])=>{
        const newInfo = {...passwordData};
        newInfo[field] = value;
        setPasswordData(newInfo);
    }

    const validationCallback = (field: string, value: string | string[] | null)=>{
        const newValidations = {...validations};
        newValidations[field] = value;
        setValidations(newValidations);
    }

    const fieldValidations = {
        password: ["password", "mandatory"],
        newPassword: ["password", "mandatory"],
        retypePassword: ["matchValue", "mandatory"],
    }

    useEffect(()=>{
        const userId = authData?._id;
        if (userId){
            setUserId(userId);
        }
    }, [])

    return (
        <Layout title='Editar Senha' navigation={navigation} hideBar={true}>
        <ScrollView style={styles.pageContainer}>
            <View style={styles.backContainer}>
                <Icon onPress={()=>{navigation.navigate("AccountPage")}} name="chevron-back" size={50}/>
            </View>
            <View style={styles.formBox}>
                <Text style={styles.titleText}>Entre com seus dados</Text>
                <View style={styles.inputsBox}>
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
                        placeholder='Nova senha'
                        type="password"
                        errorMessage={validations.newPassword as string}
                        callback={(value: string | string[])=>{
                            callback("newPassword", value);
                            const error = validateInput(value, fieldValidations.newPassword)
                            validationCallback("newPassword", error)
                        }}
                    />
                    <FormGroup
                        placeholder='Repita a nova senha'
                        type="password"
                        errorMessage={validations.retypePassword as string}
                        callback={(value: string | string[])=>{
                            callback("retypePassword", value);
                            const error = validateInput(value, fieldValidations.retypePassword, passwordData.newPassword as string)
                            validationCallback("retypePassword", error);
                        }}
                    />
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    type={"primary"}
                    label={"Mudar senha"}
                    callback={()=>{
                        const validations = {...fieldValidations};
                        const validationResult = validateAllInputs({entity: passwordData, validations});
                        if(validationResult.success) {
                            console.log("Pass", passwordData);
                            console.log("Id", userId);
                            navigation.navigate("AccountPage");
                        } else {
                            setValidations(validationResult.errors);
                            Alert.alert("OOPS!", "Um ou mais campos não estão preenchidos corretamente.", [{
                                text: "Entendi", onPress: ()=>{console.log("alert closed")}
                            }]);
                        }
                    }}
                />
            </View>
        </ScrollView>
        </Layout>
    )
}