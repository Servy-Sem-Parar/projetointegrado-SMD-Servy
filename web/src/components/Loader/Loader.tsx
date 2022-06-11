import { useState } from "react";
import {FadeLoader} from "react-spinners";
import "./Loader.css";

export let openLoader: ()=>void;
export let closeLoader: ()=>void;

export function Loader() {
    const [loader, setLoader] = useState(false);

    openLoader = ()=>{
        setLoader(true);
    }

    closeLoader = ()=>{
        setLoader(false);
    }

    return (
        <div 
            className="loader-blur"
            style={{
                display: loader === true ? "flex" : "none",
                zIndex: 20,
            }}
        >
            <FadeLoader color={"#FE9715"} loading={true} height={15} width={5} />
        </div>
    )
}