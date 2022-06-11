import {IoIosRocket} from "react-icons/io";
import {AiFillCalculator} from "react-icons/ai";
import {MdScience, MdEco} from "react-icons/md";
import "./Options.css";

const iconsArray = [
    {
        label: "Foguete",
        value: "rocket",
        component: <IoIosRocket
            className="icon-renderer-class"
        />
    },
    {
        label: "Calculadora",
        value: "calculator",
        component: <AiFillCalculator
            className="icon-renderer-class"
        />
    },
    {
        label: "Folha",
        value: "leaf",
        component: <MdEco
            className="icon-renderer-class"
        />
    },
    {
        label: "Proveta",
        value: "proveta",
        component: <MdScience
            className="icon-renderer-class"
        />
    }
]

export function getIconOptions() {
    const options = iconsArray.map(icon=>{
        return {
            value: icon.value,
            label: <div style={{fontSize: "15px", display: "flex", alignItems: "center", textAlign: "center"}}>
                {icon.label}
                {icon.component}
            </div>,
        }
    })

    return options;
}