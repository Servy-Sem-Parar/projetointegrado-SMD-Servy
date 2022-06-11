import {IoIosRocket} from "react-icons/io";
import {AiFillCalculator} from "react-icons/ai";
import {BsBook} from "react-icons/bs";
import {MdScience, MdEco} from "react-icons/md";
import "./Options.css";

const icons: Record<string, unknown> = {
    rocket: <div className="icon-table-class"><IoIosRocket/></div>,
    calculator: <div className="icon-table-class"><AiFillCalculator/></div>,
    leaf: <div className="icon-table-class"><MdEco/></div>,
    proveta: <div className="icon-table-class"><MdScience/></div>,
    default: <div className="icon-table-class"><BsBook/></div>,
}

export function getIconByName(iconName: string) {
    let icon = icons.default;

    if([
        "rocket",
        "calculator",
        "leaf",
        "proveta"
    ].includes(iconName)) {
        icon = icons[iconName];
    }

    return icon;
}