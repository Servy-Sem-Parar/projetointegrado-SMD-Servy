import IoIcon from "react-native-vector-icons/Ionicons"
import AiIcon from "react-native-vector-icons/AntDesign"
import McIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MdIcon from "react-native-vector-icons/MaterialIcons"

const icons = {
    rocket: <IoIcon name="rocket"/>,
    calculator: <AiIcon name="calculator"/>,
    leaf: <McIcon name="leaf"/>,
    proveta: <MdIcon name="science"/>,
    book: <McIcon name="book"/>,
    star: <MdIcon name="star"/>,
    computer: <MdIcon name="computer"/>,
    atom: <McIcon name="atom"/>,
}

export const nameToIcon = (name) => {
    return icons[name]
}