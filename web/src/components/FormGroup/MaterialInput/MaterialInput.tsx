import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { alertError } from "../../Alert/Alert";
import "../FormGroup.css";

interface IMaterialsInputProps {
    placeholder: string,
    disabled?: boolean,
    id: string,
    onChange?: (value: string | Date | string[])=>void,
    validations?: string[],
    errorMessage?: string,
    setFieldValidation?: (field: string, value: string)=>void,
    defaultValue?: string | Record<string, string>[] | Date,
}

export function MaterialsInput(props: IMaterialsInputProps) {
    const [materialTitle, setMaterialTitle] = useState("");
    const [materialLink, setMaterialLink] = useState("");
    const [materials, setMaterials] = useState<{name: string, link: string}[]>([]);

    useEffect(()=>{
        if(props.defaultValue) {
            setMaterials(JSON.parse(props.defaultValue as string))
        }
    }, [props.defaultValue])

    return(
        <div>
            <div className="materials-inputs-container">
                <div style={{display: "flex", width: "100%"}}>
                    <input 
                        className={`form-control-input material-input size-50 ${props.errorMessage && "is-invalid-field"}`}
                        onChange={(event)=>{
                            setMaterialTitle(event.target.value);
                        }} 
                        id={"material-title"} 
                        disabled={props.disabled}
                        placeholder={"Insira o nome do material"} 
                        type={"text"} 
                    />
                    <input 
                        className={`form-control-input material-input size-50 ${props.errorMessage && "is-invalid-field"}`}
                        onChange={(event)=>{
                            setMaterialLink(event.target.value);
                        }} 
                        id={"material-link"} 
                        disabled={props.disabled}
                        placeholder={"Insira o link do material"} 
                        type={"text"} 
                    />
                </div>
                <GoPlus
                    className="material-icon-button"
                    onClick={()=>{
                        if(!props.disabled){
                            if(materialTitle.length > 0 && materialLink.length > 0) {
                                const newMaterials = materials;
                                newMaterials.push({
                                    name: materialTitle,
                                    link: materialLink
                                })
                                setMaterials(newMaterials);
                                setMaterialTitle("");
                                setMaterialLink("");
                                (document.getElementById("material-title") as HTMLInputElement).value = "";
                                (document.getElementById("material-link") as HTMLInputElement).value = "";
                                if(props.onChange) {
                                    props.onChange(JSON.stringify(newMaterials));
                                }
                            } else {
                                alertError("Insira as inforamações do material.")
                            }
                        }
                    }}
                />
            </div>
            <div>
                {
                    materials.map((material, index)=>{
                        return (
                            <div className="material-marker">
                                {material.name} 
                                {!props.disabled && <div 
                                    className="material-close-icon"
                                    onClick={()=>{
                                        const newMaterials: {name: string, link: string}[] = [];
                                        materials.forEach((material, i)=>{
                                            if(index !== i) {
                                                newMaterials.push(material);
                                            }
                                        })
                                        setMaterials(newMaterials);
                                        if(props.onChange) {
                                            props.onChange(JSON.stringify(newMaterials));
                                        }
                                    }}
                                >
                                    x
                                </div>}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}