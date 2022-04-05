import { View, Image, Text, TouchableOpacity } from 'react-native';
import logoImage from "../../assets/logo.png";

import styles from "./styles"

export default function TeacherLoginPage({navigation}: {navigation: any}) {

    return (
        <View style={styles.container}>
            <Image style={styles.logoImage} source={logoImage} />  
            <Text style={styles.mainText}>Como deseja acessar a plataforma?</Text>  
            <TouchableOpacity
                onPress={()=>{navigation.navigate("StudentLoginPage");}}
                style={[styles.button, styles.primaryButton]}
            >
                <Text style={styles.buttonText}>Aluna</Text>
            </TouchableOpacity>  
            <TouchableOpacity
                onPress={()=>{navigation.navigate("TeacherLoginPage");}}
                style={[styles.button, styles.secondaryButton]}
            >
                <Text style={styles.buttonText}>Professora</Text>
            </TouchableOpacity>         
        </View>
    )
}