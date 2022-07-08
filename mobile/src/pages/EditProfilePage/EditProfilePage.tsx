import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useAuth } from "../../context/Auth";
import styles from "./EditProfilePageStyles";
import { editEntity, getUser } from "./requester";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "../../components/Button/Button";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { validateAllInputs, validateInput } from "../../Tools/validateInputs";
import { Layout } from "../../components/Layout/Layout";

export function EditProfilePage({navigation}: {navigation: any}) {
    const [user, setUser] = useState<Record<string, unknown>>({});
    const { authData } = useAuth();
    const [validations, setValidations] = useState<Record<string, unknown>>({});

    const callback = (field: string, value: string | string[])=>{
        const newInfo = {...user};
        newInfo[field] = value;
        setUser(newInfo);
    }

    const validationCallback = (field: string, value: string | string[] | null)=>{
        const newValidations = {...validations};
        newValidations[field] = value;
        setValidations(newValidations);
    }

    const fieldValidations = {
        name: ["mandatory"],
        email: ["mandatory"],
        phone_number: [],
        birthDate: ["date"],
        address: ["mandatory"],
        schoolType: ["mandatory"],
    }

    useEffect(()=>{
        const userId = authData?._id;
        if (userId){
            getUser(userId).then(user=>{
                const birthDate = user.birthDate as string;
                user.birthDateDefaultValue = `${birthDate.substr(8,2)}/${birthDate.substr(5,2)}/${birthDate.substr(0,4)}`
                setUser(user);
            })
        }
    }, [])

    return (
        <Layout title='Editar Perfil' navigation={navigation} hideBar={true}>
        <ScrollView style={styles.pageContainer}>
            <View style={styles.backContainer}>
                <Icon onPress={()=>{navigation.navigate("AccountPage")}} name="chevron-back" size={50}/>
            </View>
            <View style={styles.formBox}>
                <Text style={styles.titleText}>Entre com seus dados</Text>
                <View style={styles.inputsBox}>
                    <FormGroup
                        placeholder='Nome e sobrenome'
                        type="text"
                        errorMessage={validations.name as string}
                        defaultValue={user.name as string}
                        callback={(value: string | string[])=>{
                            callback("name", value);
                            const error = validateInput(value, fieldValidations.name)
                            validationCallback("name", error);
                        }}
                    />
                    <FormGroup
                        placeholder='Data de nascimento'
                        type="date"
                        defaultValue={user.birthDateDefaultValue as string}
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
                        defaultValue={user.email as string}
                        errorMessage={validations.email as string}
                        callback={(value: string | string[])=>{
                            callback("email", (value as string).trim());
                            const error = validateInput(value, fieldValidations.email)
                            validationCallback("email", error);
                        }}
                    />
                    <FormGroup
                        placeholder='Endereço'
                        type="text"
                        defaultValue={user.address as string}
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
                        defaultValue={user.schoolType as string}
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
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    type={"primary"}
                    label={"Editar"}
                    callback={()=>{
                        const validations = {...fieldValidations};
                        const validationResult = validateAllInputs({entity: user, validations});
                        if(validationResult.success) {
                            editEntity(user, user._id as string).then(success=>{
                                if(success) {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'AccountPage' }]
                                    }) 
                                }
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
        </ScrollView>
        </Layout>
    )
}