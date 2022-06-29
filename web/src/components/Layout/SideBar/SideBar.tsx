import React from 'react';
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

type SidebarItem = {
    key: string;
    icon: JSX.Element;
    onClick?: React.MouseEventHandler;
    permission?: string;
    testSidebar?: string;
    label: string;
}

const items: SidebarItem[] = [
    {
        key: "home",
        icon: <MdHome/>,
        label: "Home"
    },
    {
        key: "professoras",
        icon: <FaChalkboardTeacher/>,
        label: "Professoras",
        permission: "admin"
    },
    {
        key: "alunas",
        icon: <MdSchool/>,
        label: "Alunas",
        permission: "admin",
        testSidebar: "aprovar_cadastros"
    },
    {
        key: "disciplinas",
        icon: <MdOutlineClass/>,
        label: "Disciplinas",
        permission: "admin"
    },
    {
        key: "turmas",
        icon: <MdListAlt/>,
        label: "Turmas",
    },
    {
        key: "minha-conta",
        icon: <MdAccountCircle/>,
        label: "Minha Conta",
        onClick: () => openProfileModal()
    },
]

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
                {items.map(item => (
                    <div 
                        key={item.key}
                        onClick={item.onClick === undefined ? () => {window.location.pathname = item.key} : item.onClick}
                        className={ testSideBar(item.key) || (item.testSidebar ? testSideBar(item.testSidebar) : false) ? "side-bar-item-active" : "side-bar-item"}
                        style={item.permission && item.permission !== permission ? {display: "none"} : {}} 
                    >
                        {React.cloneElement(item.icon, {className: "side-bar-icon"})}
                        <div className="side-bar-item-text-content">{item.label}</div>
                    </div>
                ))}
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