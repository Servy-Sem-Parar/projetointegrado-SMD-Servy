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
