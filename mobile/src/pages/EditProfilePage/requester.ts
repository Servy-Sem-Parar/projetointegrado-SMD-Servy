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