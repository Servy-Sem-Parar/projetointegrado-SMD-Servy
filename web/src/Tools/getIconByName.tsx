import { IoIosRocket } from "react-icons/io";
import { AiFillCalculator } from "react-icons/ai";
import { ImBook } from "react-icons/im";
import { MdScience, MdEco, MdStar, MdComputer } from "react-icons/md";
import { BiAtom } from "react-icons/bi";
import "./Options.css";

const icons: Record<string, unknown> = {
    rocket: <div className="icon-table-class"><IoIosRocket/></div>,
    calculator: <div className="icon-table-class"><AiFillCalculator/></div>,
    leaf: <div className="icon-table-class"><MdEco/></div>,
    proveta: <div className="icon-table-class"><MdScience/></div>,
    book: <div className="icon-table-class"><ImBook/></div>,
    star: <div className="icon-table-class"><MdStar/></div>,
    computer: <div className="icon-table-class"><MdComputer/></div>,
    atom: <div className="icon-table-class"><BiAtom/></div>,
}

export function getIconByName(iconName: string) {
    let icon = icons[iconName];

    return icon;
}