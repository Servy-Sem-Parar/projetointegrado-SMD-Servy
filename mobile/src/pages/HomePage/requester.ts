import { makeConnection } from "../../Tools/makeConnection";

export async function getUser(entityId: string) {
    const suffix = "user";
    const method = "get";

    const response = await makeConnection({
        suffix,
        method,
        entityId,
    });
    
    return response?.data.data
}

export async function getAulas(turmas: string[], dateStart: string, dateEnd:String) {
    const suffix = "aula";
    const method = "get";

    const otherQueryStrings: Record<string, unknown> = { 
        offset: 0,
        limit: 10000,
        turma: turmas,
        dateStart,
        dateEnd
    };

    const response = await makeConnection({
        suffix,
        method,
        otherQueryStrings
    });

    return response?.data.data;
}