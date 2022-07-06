import { makeConnection } from "../../Tools/makeConnection";

export async function getTurmas() {
    const suffix = "turma";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { 
        sort: "name",
        order: "asc",
        offset: 0,
        limit: 10000,
    };
    let options: {label: string, value: string}[] = [];

    const response = await makeConnection({
        suffix,
        method,
        otherQueryStrings
    });
    options= (response?.data.data as Record<string, unknown>[]).map((entity)=>{
        return {
            label: entity.name as string,
            value: entity._id as string
        }
    });

    return options;
}