import LogoImage from "../../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

import "./TopBar.css";

interface ITopBarProps {
    sideBarIsOpen: boolean;
    changeSideBarState: (value: boolean)=>void;
}

function TopBar(props:ITopBarProps) {

    return (
        <div className="top-bar">
            <div onClick={()=>{ props.changeSideBarState(!props.sideBarIsOpen) }} className={!props.sideBarIsOpen ? "burguer-button-box-active" : "burguer-button-box"}>
                <GiHamburgerMenu/>
            </div>
            <img onClick={()=>{window.location.pathname = "home"}} src={LogoImage} alt="logo" className="top-bar-logo" />
        </div>
    )
}

export default TopBar;