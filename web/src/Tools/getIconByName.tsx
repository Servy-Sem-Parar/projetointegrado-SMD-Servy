import {IoIosRocket} from "react-icons/io";
import {AiFillCalculator} from "react-icons/ai";
import {BsBook} from "react-icons/bs";

export function getIconByName(iconName: string) {
    let icon = <div style={{fontSize: "40px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <BsBook/>
        </div>

    switch (iconName) {
        case "rocket":
            icon = <div style={{fontSize: "40px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                        <IoIosRocket/>
                    </div>
            break;
        case "calculator":
            icon = <div style={{fontSize: "40px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                <AiFillCalculator/>
            </div>
            break;
        default:
            break;
    }

    return icon;
}