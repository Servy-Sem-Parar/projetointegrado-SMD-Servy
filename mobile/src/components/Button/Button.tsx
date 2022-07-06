import { Text, TouchableOpacity } from "react-native"
import { buttonStyles } from "./ButtonsStyles"

interface IButtonProps {
    callback: ()=>void,
    label: string,
    type: "primary" | "span"
}

export function Button(props: IButtonProps) {
    const style = getButtonStyle(props.type)
    return (
        <TouchableOpacity
            onPress={()=>{props.callback()}}
            style={style.button}
        >
            <Text style={style.label}>{props.label}</Text>
        </TouchableOpacity> 
    )
}

const getButtonStyle = (type: "primary" | "span")=>{
    let styles;
    switch(type) {
        case "primary":
            styles = {
                label: buttonStyles.primaryButtonLabel,
                button: buttonStyles.primaryButton
            }
            break;
        case "span":
            styles = {
                label: buttonStyles.spanButtonLabel,
                button: buttonStyles.spanButton
            }
            break;
    }

    return styles;
}