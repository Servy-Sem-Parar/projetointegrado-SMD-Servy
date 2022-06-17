import React, { ReactNode, useEffect, useState } from 'react';
import SideBar from './SideBar/SideBar';

import "./Layout.css";
import { Loader } from '../Loader/Loader';
import { Alert } from '../Alert/Alert';
import { isAuth } from '../../routes/routes';

interface ILayoutProps {
    children: ReactNode;
}

function Layout(props: ILayoutProps) {
    const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(true);
    const routesWithOutLayout = ["/"]

    useEffect(()=>{
        const sideBarState = JSON.parse(localStorage.getItem("sideBarState") as string);
        if(typeof sideBarState === "boolean") {
            setSideBarIsOpen(sideBarState);
        } else {
            setSideBarIsOpen(true);
        }
    }, [])

    return(
        <div style={{width: "100%", height: "100%"}}>
            <Loader/>
            <Alert/>
            <div className={!routesWithOutLayout.includes(window.location.pathname) && isAuth() ? 'layout-body' : "no-layout"}>
                {!routesWithOutLayout.includes(window.location.pathname) && isAuth() &&
                    <SideBar
                        sideBarIsOpen={sideBarIsOpen}
                        changeSideBarState={(value: boolean)=>{
                            setSideBarIsOpen(value);
                            localStorage.setItem("sideBarState", JSON.stringify(value))
                        }}
                    />
                }
                <div className={!routesWithOutLayout.includes(window.location.pathname) && isAuth() ? 'layout-content': "no-layout"}>
                    {props.children}
                </div>
            </div>
        </div>
    ) 
}

export default Layout;