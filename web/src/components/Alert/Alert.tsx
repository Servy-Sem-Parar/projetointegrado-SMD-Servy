import { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import "./Alert.css";

export let alertSuccess: (message: string)=>void;
export let alertError: (message: string)=>void;

export function Alert() {
    const [success, setSuccess] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    alertSuccess = (message:string)=>{
        setSuccess(true);
        setMessage(message);
        setShowAlert(true);
        setTimeout(()=>{setShowAlert(false)}, 10000)
    }

    alertError = (message:string)=>{
        setSuccess(false);
        setMessage(message);
        setShowAlert(true);
        setTimeout(()=>{setShowAlert(false)}, 10000)
    }

    return (
        <div className="alert-container">
            <div className={`${showAlert === true ? "alert" : "hidden"} ${success === true ? "alert-success" : "alert-error"}`}>
                <div className="alert-body">
                    {
                        success === true ?
                            <AiFillCheckCircle className="success-icon"/>
                        :
                            <AiFillCloseCircle className="error-icon"/>
                    }
                    <div className="alert-text"> 
                        {message}
                    </div>
                    <div>
                    <div className="close-icon" onClick={()=>{setShowAlert(false)}}>x</div></div>
                </div>
            </div>    
        </div>
    )
}