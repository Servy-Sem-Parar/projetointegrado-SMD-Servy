import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';
import { useAuth } from '../../context/Auth';
import styles from './AccountPageStyles';
import { getUser } from './requester';

export function AccountPage({navigation}: {navigation: any}) {
    const [user, setUser] = useState<Record<string, string>>({}) 
    const { authData } = useAuth()

    useEffect(()=>{
        const userId = authData?._id;

        if (userId){
            getUser(userId).then(setUser)
        }
    }, [])

    return (
        <Layout title='Meu Perfil' navigation={navigation}>
            <View style={styles.dataBox}>
                <Text style={styles.pageTitle}>Meus dados</Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Nome: </Text>
                    <Text style={styles.dataContent}>{user.name ? user.name : ""}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Email: </Text>
                    <Text style={styles.dataContent}>{user.email ? user.email : ""}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Telefone: </Text>
                    <Text style={styles.dataContent}>{user.phone_number ? user.phone_number : "Sem telefone"}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Endereço: </Text>
                    <Text style={styles.dataContent}>{user.address ? user.address : ""}</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                <Button
                    type={"primary"}
                    label={"Editar"}
                    callback={()=>{
                        navigation.navigate("EditProfilePage")
                    }}
                />
                </View>
            </View>
        </Layout>
    )
}