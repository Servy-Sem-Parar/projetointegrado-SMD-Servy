import { formatDateToShow } from "../../Tools/formatDateToShow";
import { formatPhoneNumberToShow } from "../../Tools/formatPhoneNumberToShow";
import { makeConnection } from "../../Tools/makeConnection"

interface IResult {
    data: Record<string, unknown>[];
    total: number;
}

function _formatEntities(entity: Record<string, unknown>) {
    const formatedEntity = {
        dateToShow: formatDateToShow(entity.createdAt as string),
        phone: entity.phone_number ? formatPhoneNumberToShow(entity.phone_number as string) : "",
        ...entity
    }

    return formatedEntity;
}

export async function getEntities(offset: number, filters?: Record<string, unknown>) {
    const suffix = "user/alunas";
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

    return result;
}

export async function editEntity(body: Record<string, unknown>, entityId: string) {
    const suffix = "user";
    const method = "put";
    let success = false;

    const response = await makeConnection({
        suffix,
        method,
        body,
        entityId
    });
    success = response ? true : false;

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

    return options;
}

export async function getEntity(id: string){
    const suffix = "user";
    const method = "get";
    let entity: Record<string, unknown> = {};

    const response = await makeConnection({
        suffix,
        method,
        entityId: id,
    });
    entity = response?.data.data;
    let turmasDefaultValue: Record<string, unknown>[] = []; 
    let turmas: string[] = []; 
    (entity.turmas as Record<string, unknown>[]).forEach(turma=>{
        turmasDefaultValue.push({
            label: turma.name,
            value: turma._id
        })
        turmas.push(turma._id as string);
    })
    entity.turmas = turmas;
    entity.turmasDefaultValue = turmasDefaultValue;
    
    return entity;
}