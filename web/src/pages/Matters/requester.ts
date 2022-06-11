import { alertError } from "../../components/Alert/Alert";
import { closeLoader, openLoader } from "../../components/Loader/Loader";
import { getIconOptions } from "../../Tools/getIconOptions";
import { makeConnection } from "../../Tools/makeConnection"

interface IResult {
    data: Record<string, unknown>[];
    total: number;
}

function _formatEntities(entity: Record<string, unknown>) {
    const icons = getIconOptions();
    let iconDefaultValue;
    icons.forEach((icon)=>{
        if(icon.value === entity.icon) {
            iconDefaultValue = icon;
        }
    })
    entity.iconName = entity.icon;
    entity.icon = iconDefaultValue;

    return entity;
}

export async function getEntities(offset: number, filters?: Record<string, unknown>) {
    const suffix = "disciplina";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { offset };
    let result: IResult = {
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
        const entities = (response?.data.data as Record<string, unknown>[]).map((entity)=>{
            return _formatEntities(entity as Record<string, unknown>);
        });
        result = {
            data: entities,
            total: response?.data.data.total
        }
    } catch(err) {
        const error = err as {
            response: {
              data: {
                error: string
              }
            }
        }
        alertError(error.response.data.error);
    }
    closeLoader();

    return result;
}

export async function createEntity(body: Record<string, unknown>) {
    const suffix = "disciplina";
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
        const error = err as {
            response: {
              data: {
                error: string
              }
            }
        }
        alertError(error.response.data.error);
    }

    closeLoader();

    return success;
}

export async function editEntity(body: Record<string, unknown>, entityId: string) {
    const suffix = "disciplina";
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
        const error = err as {
            response: {
              data: {
                error: string
              }
            }
        }
        alertError(error.response.data.error);
    }
    
    closeLoader();

    return success;
}

export async function deleteEntity(entityId: string) {
    const suffix = "disciplina";
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
        const error = err as {
            response: {
              data: {
                error: string
              }
            }
        }
        alertError(error.response.data.error);
    }
    
    closeLoader();

    return success;
}