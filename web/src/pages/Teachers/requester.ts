import { closeLoader, openLoader } from "../../components/Loader/Loader";
import { makeConnection } from "../../Tools/makeConnection"

export async function getEntities(offset: number, filters?: Record<string, unknown>) {
    const suffix = "user/professoras";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { offset };
    let entities = [];

    if(filters) {
        Object.keys(filters).forEach((key)=>{
            if(filters[key] && filters[key] !== "") {
                otherQueryStrings[key] = filters[key];
            }
        })
    }
    openLoader();
    
    try {
        const response = await makeConnection({
            suffix,
            method,
            otherQueryStrings
        });
        entities = response?.data.data;
    } catch(err) {
        console.error(err);
    }
    closeLoader();

    return entities;
}