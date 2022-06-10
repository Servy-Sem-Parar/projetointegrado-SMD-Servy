import { closeLoader, openLoader } from "../../components/Loader/Loader";
import { makeConnection } from "../../Tools/makeConnection"

function getPermissionLabel(permission: string) {
    let permissionLabel = ""

    switch(permission) {
        case "teacher":
            permissionLabel = "Professora";
            break;
        case "admin":
            permissionLabel = "Administradora";
            break;
    }

    return permissionLabel;
}

export async function getEntities(offset: number, filters?: Record<string, unknown>) {
    const suffix = "disciplinas";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { offset };
    let result = {
        data: [],
        total: 1,
    };

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
        const entities = response?.data;
        result = {
            data: entities,
            total: response?.data.total
        }
    } catch(err) {
        console.error(err);
    }
    closeLoader();

    return result;
}

export async function createEntity(body: Record<string, unknown>) {
    const suffix = "disciplinas";
    const method = "post";
    let success = false;

    openLoader();
    
    try {
        const response = await makeConnection({
            suffix,
            method,
            body
        });
        success = response ? true : false;
    } catch(err) {
        console.error(err);
    }

    closeLoader();

    return success;
}

export async function editEntity(body: Record<string, unknown>, entityId: string) {
    const suffix = "materias";
    const method = "put";
    let success = false;

    openLoader();
    
    try {
        const response = await makeConnection({
            suffix,
            method,
            body,
            entityId
        });
        success = response ? true : false;
    } catch(err) {
        console.error(err);
    }
    
    closeLoader();

    return success;
}

export async function deleteEntity(entityId: string) {
    const suffix = "disciplinas";
    const method = "delete";
    let success = false;

    openLoader();
    
    try {
        const response = await makeConnection({
            suffix,
            method,
            entityId
        });
        success = response ? true : false;
    } catch(err) {
        console.error(err);
    }
    
    closeLoader();

    return success;
}