import { View, Image, Text, Pressable, TextInput } from 'react-native';
import logoImage from "../../assets/logo.png"

import styles from "./styles"

export default function TeacherLoginPage() {
    return (
        <View style={styles.container}>
            <Image style={styles.logoImage} source={logoImage} />  
            <Text style={styles.titleText}>Entrar como professora</Text>
            <Text style={styles.inputLabel}>Email:</Text> 
            <TextInput
                style={styles.input}
                editable
                maxLength={40}
                placeholder={"Digite seu email"}
            />
            <Text style={styles.inputLabel}>Senha:</Text>
            <TextInput
                style={styles.input}
                editable
                maxLength={40}
                placeholder={"Digite sua senha"}
                secureTextEntry={true}
            />
            <Pressable
                onPress={()=>{console.log("oi")}}
                style={styles.secondaryButton}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </Pressable> 
        </View>
    )
}