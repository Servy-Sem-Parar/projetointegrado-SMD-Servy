import Modal from "react-native-modal";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./ForgotPasswordModalStyles";

interface IForgotPasswordModalProps {
    isOpen: boolean;
    closeModalFunction: ()=>void
}

export function ForgotPasswordModal(props:IForgotPasswordModalProps) {
    return (
        <Modal
            isVisible={props.isOpen}
            onBackdropPress={() => {
                props.closeModalFunction();
            }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
             <View style={styles.container}>
                <View style={styles.aulasContainer}>
                    <Text style={styles.forgotText}>Caso tenha esquecido sua senha entre em contato com uma administradora para que ela gere uma nova senha.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Icon name="close" size={25} onPress={() =>{props.closeModalFunction()}}/>
                </View>
             </View>
            
        </Modal>
    )
}