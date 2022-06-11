import { closeLoader, openLoader } from "../../components/Loader/Loader";
import { formatPhoneNumberToShow } from "../../Tools/formatPhoneNumberToShow";
import { makeConnection } from "../../Tools/makeConnection"

interface IResult {
    data: Record<string, unknown>[];
    total: number;
}

function _formatEntities(entity: Record<string, unknown>) {
    const formatedEntity = {
        phone: entity.phone_number ? formatPhoneNumberToShow(entity.phone_number as string) : "",
        permission: getPermissionLabel(entity.role as string),
        ...entity
    }

    return formatedEntity;
}

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
    const suffix = "user/professoras";
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
            return _formatEntities(entity);
        })
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
    const suffix = "user";
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
    const suffix = "user";
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
    const suffix = "user";
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

export async function getTurmas() {
    const suffix = "turma";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { 
        sort: "name",
        order: "asc",
        offset: 0,
        limit: 10000,
    };
    let options: Record<string, unknown>[] = [];

    openLoader();
    
    try {
        const response = await makeConnection({
            suffix,
            method,
            otherQueryStrings
        });
        options= (response?.data.data as Record<string, unknown>[]).map((entity)=>{
            return {
                label: entity.name,
                value: entity._id
            }
        });
    } catch(err) {
        console.error(err);
    }
    closeLoader();

    return options;
}

export async function getEntity(id: string){
    const suffix = "user";
    const method = "get";
    let entity: Record<string, unknown> = {};

    openLoader();
    
    try {
        const response = await makeConnection({
            suffix,
            method,
            entityId: id,
        });
        entity = response?.data.data;
        const turmas = (entity.turmas as Record<string, unknown>[]).map(turma=>{
            return ({
                label: turma.name,
                value: turma._id
            })
        })
        entity.turmas = turmas;
    } catch(err) {
        console.error(err);
    }

    closeLoader()
    
    return entity;
}