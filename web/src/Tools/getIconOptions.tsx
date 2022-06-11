import {IoIosRocket} from "react-icons/io";
import {AiFillCalculator} from "react-icons/ai";

export function getIconOptions() {
    return [
        {
            label: <div style={{fontSize: "15px", display: "flex", alignItems: "center", textAlign: "center"}}>
                        Foguete
                        <IoIosRocket
                            style={{marginLeft: "5px"}}
                        />
                    </div>,
            value: "rocket"        
        },
        {
            label: <div style={{fontSize: "15px", display: "flex", alignItems: "center", textAlign: "center"}}>
                        Calculadora
                        <AiFillCalculator
                            style={{marginLeft: "5px"}}
                        />
                    </div>,
            value: "calculator"        
        },
    ]
}