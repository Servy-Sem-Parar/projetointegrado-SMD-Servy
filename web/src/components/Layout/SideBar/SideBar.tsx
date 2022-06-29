import {GiHamburgerMenu} from "react-icons/gi";
import {FaChalkboardTeacher} from "react-icons/fa";
import {MdOutlineClass, MdAccountCircle, MdSchool, MdListAlt, MdLogout, MdHome} from "react-icons/md"
import logout from "../../../Tools/logout";
import LogoImage from "../../../assets/logo.png";

import "./SideBar.css";
import { getUserPermission } from "../../../Tools/getUserPermission";
import { openProfileModal } from "../MyAccountModal/ModalsProvider";

interface ISideBarProps {
    sideBarIsOpen: boolean;
    changeSideBarState: (value: boolean)=>void;
}

function testSideBar(route: string) {
    return window.location.pathname.includes(route)
}

function SideBar(props: ISideBarProps) {
    const permission = getUserPermission();

    return (
        <div className={`side-bar ${props.sideBarIsOpen === false && "side-bar-closed"}`}>
            <div className="side-bar-body">
                <div className={props.sideBarIsOpen ? "side-bar-logo-container" : "side-bar-logo-container-closed"}>
                    <div className={`login-logo-sidebar ${props.sideBarIsOpen ? "opened" : "closed"}`}>
                        <div onClick={()=>{ props.changeSideBarState(!props.sideBarIsOpen) }} className={!props.sideBarIsOpen ? "burguer-button-box-active" : "burguer-button-box"}>
                            <GiHamburgerMenu/>
                        </div>
                        {props.sideBarIsOpen && <div className="login-logo-holder sidebar">
                            <span className='login-logo-text-title'>
                                Projeto
                            </span>
                            <span className='login-logo-text-subtitle'>
                                Sem Parar
                            </span>
                        </div>}
                    </div>
                </div>
                <div onClick={()=>{window.location.pathname = "home"}} className={ testSideBar("home") ? "side-bar-item-active" : "side-bar-item"}>
                    <MdHome
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Home</div>
                </div>
                {permission === "admin" && <div onClick={()=>{window.location.pathname = "professoras"}} className={ testSideBar("professoras") ? "side-bar-item-active" : "side-bar-item"}>
                    <FaChalkboardTeacher
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Professoras</div>
                </div>}
                {permission === "admin" && <div onClick={()=>{window.location.pathname = "alunas"}} className={ testSideBar("alunas") || testSideBar("aprovar_cadastros") ? "side-bar-item-active" : "side-bar-item"}>
                    <MdSchool
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Alunas</div>
                </div>}
                {permission === "admin" && <div onClick={()=>{window.location.pathname = "disciplinas"}} className={ testSideBar("disciplinas") ? "side-bar-item-active" : "side-bar-item"}>
                    <MdOutlineClass
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Disciplinas</div>
                </div>}
                <div onClick={()=>{window.location.pathname = "turmas"}} className={ testSideBar("turmas") ? "side-bar-item-active" : "side-bar-item"}>
                    <MdListAlt
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Turmas</div>
                </div>
                <div onClick={()=>{openProfileModal()}} className={ testSideBar("minha-conta") ? "side-bar-item-active" : "side-bar-item"}>
                    <MdAccountCircle
                        className="side-bar-icon"
                    />
                    <div className="side-bar-item-text-content">Minha Conta</div>
                </div>
            </div>
            <div onClick={()=>{logout()}} className={"logout-buttom"}>
                <MdLogout
                    className="side-bar-icon"
                />
                <div className="side-bar-item-text-content">Sair</div>
            </div>
        </div>
    )
}

export default SideBar;