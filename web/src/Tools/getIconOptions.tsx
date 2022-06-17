import {IoIosRocket} from "react-icons/io";
import {AiFillCalculator} from "react-icons/ai";
import {MdScience, MdEco, MdStar, MdComputer} from "react-icons/md";
import "./Options.css";
import { ImBook } from "react-icons/im";
import { BiAtom } from "react-icons/bi";

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
    },
    {
        label: "Livro",
        value: "book",
        component: <ImBook
            className="icon-renderer-class"
        />
    },
    {
        label: "Estrela",
        value: "star",
        component: <MdStar
            className="icon-renderer-class"
        />
    },
    {
        label: "Computador",
        value: "computer",
        component: <MdComputer
            className="icon-renderer-class"
        />
    },
    {
        label: "Átomo",
        value: "atom",
        component: <BiAtom
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