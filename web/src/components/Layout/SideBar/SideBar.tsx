import {GiTeacher} from "react-icons/gi";
import {FaUserGraduate} from "react-icons/fa";
import {BsCalendarDayFill} from "react-icons/bs";
import {SiGoogleclassroom} from "react-icons/si";
import {BiLogOut} from "react-icons/bi";
import {AiFillHome} from "react-icons/ai";
import logout from "../../../Tools/logout";

import "./SideBar.css";

interface ISideBarProps {
    sideBarIsOpen: boolean;
}

function testSideBar(route: string) {
    return window.location.pathname.includes(route)
}

function SideBar(props: ISideBarProps) {

    return (
        <div className={`side-bar ${props.sideBarIsOpen === false && "side-bar-closed"}`}>
            <div className="side-bar-body">
                <div onClick={()=>{window.location.pathname = "home"}} className={ testSideBar("home") ? "side-bar-item-active" : "side-bar-item"}>
                    <AiFillHome
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Home</div>
                </div>
                <div onClick={()=>{window.location.pathname = "professoras"}} className={ testSideBar("professoras") ? "side-bar-item-active" : "side-bar-item"}>
                    <GiTeacher
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Professoras</div>
                </div>
                <div onClick={()=>{window.location.pathname = "alunas"}} className={ testSideBar("alunas") ? "side-bar-item-active" : "side-bar-item"}>
                    <FaUserGraduate
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Alunas</div>
                </div>
                <div onClick={()=>{window.location.pathname = "turmas"}} className={ testSideBar("turmas") ? "side-bar-item-active" : "side-bar-item"}>
                    <SiGoogleclassroom
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Turmas</div>
                </div>
                <div onClick={()=>{window.location.pathname = "planejamento"}} className={ testSideBar("planejamento") ? "side-bar-item-active" : "side-bar-item"}>
                    <BsCalendarDayFill
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Planejamento</div>
                </div>
            </div>
            <div onClick={()=>{logout()}} className={"logout-buttom"}>
                <BiLogOut
                    className="side-bar-icon"
                />
                <div className="side-bar-item-text-content">Sair</div>
            </div>
        </div>
    )
}

export default SideBar;