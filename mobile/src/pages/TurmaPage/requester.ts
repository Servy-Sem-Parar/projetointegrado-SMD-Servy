import moment from "moment";
import { makeConnection } from "../../Tools/makeConnection";

export async function getMateriais(turma: string) {
    const suffix = "aula";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { 
        sort: "date",
        order: "asc",
        offset: 0,
        limit: 10000,
        turma
    };

    const response = await makeConnection({
        suffix,
        method,
        otherQueryStrings
    });

    let materiais = (response?.data.data as unknown as Record<string, unknown>[]).map(aula=>aula.materiais).flat() as Record<string, unknown>[];
    materiais = materiais.map(material=>{
        const materialFormated = material;
        materialFormated.date = moment(material.date as string).format("DD/MM/YYYY")
        return materialFormated;
    })
    return materiais;
}

export async function getTurma(turmaId: string) {
    const suffix = "turma";
    const method = "get";

    const response = await makeConnection({
        suffix,
        method,
        entityId: turmaId
    });

    return response?.data?.data;
}