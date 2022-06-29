import { makeConnection } from "../../Tools/makeConnection";

export async function getTurma(id: string) {
    const suffix = "turma";
    const method = "get";
    const entityId = id;

    const response = await makeConnection({
        suffix,
        method,
        entityId
    });

    const entity = response?.data.data as Record<string, unknown>;

    entity.professoras = "" ;
    const teachers = entity.teachers as Record<string, unknown>[];
    teachers.forEach((professora, index)=>{
        if(index === 0) {
            entity.professoras = professora.name;
        } else if(index === teachers.length-1) {
            entity.professoras = (entity.professoras as string) + " e " + professora.name;
        } else {
            entity.professoras = (entity.professoras as string) + ", " + professora.name;
        }
    })

    return entity;
}

export async function getAulas(turma: string, dateStart: string, dateEnd:String) {
    const suffix = "aula";
    const method = "get";

    const otherQueryStrings: Record<string, unknown> = { 
        offset: 0,
        limit: 10000,
        turma: turma,
        dateStart,
        dateEnd
    };

    const response = await makeConnection({
        suffix,
        method,
        otherQueryStrings
    });

    const entities = (response?.data.data as Record<string, unknown>[]).map(aula=>{
        const startHour = (aula.date as string).substr(11,5);
        let endHourNumber = (parseInt((aula.date as string).substr(11,2))+(aula.duration as number)).toString();
        if(endHourNumber.length < 2) {
            endHourNumber = "0"+endHourNumber;
        }
        const endHour = `${endHourNumber}${(aula.date as string).substr(13,3)}`;
        return ({
            startHour,
            endHour,
            ...aula
        } as Record<string, unknown>)
    })

    return entities;
}