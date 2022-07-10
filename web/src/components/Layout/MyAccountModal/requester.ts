import { makeConnection } from "../../../Tools/makeConnection";


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
    if(response){
        delete response.data.data.turmas;
        localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    success = response ? true : false;

    return success;
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

export async function editPassword(body: Record<string, unknown>) {
    const suffix = "auth/changePassword";
    const method = "post";
    let success = false;

    const response = await makeConnection({
        suffix,
        method,
        body
    });

    success = response ? true : false;

    return success;
}