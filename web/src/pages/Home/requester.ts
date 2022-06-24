import { makeConnection } from "../../Tools/makeConnection";

function formatEntities(turmas: Record<string, unknown>[]) {
    const formatedEntities = turmas.map(turma=>{
        return ({
            id: turma._id,
            name: turma.name,
            icon: (turma.disciplina as Record<string, unknown>).icon,
            color: turma.color,
        })
    })

    return formatedEntities;
}

export async function getAllTurmas() {
    const suffix = "turma";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { 
        offset: 0,
        limit: 10000,
    };

    const user = JSON.parse(localStorage.getItem("user") as string);

    if(user.role === "teacher") {
        otherQueryStrings.userId = user._id;
    }

    const response = await makeConnection({
        suffix,
        method,
        otherQueryStrings
    });

    const entities = formatEntities(response?.data.data as Record<string, unknown>[])

    return entities;
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