import { makeConnection } from "../../Tools/makeConnection";

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