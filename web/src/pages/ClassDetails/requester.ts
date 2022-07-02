import { formatDateToShow } from "../../Tools/formatDateToShow";
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
    entity.alunas = entity.students;
    entity.studentsDefaultValue = (entity.students as Record<string, unknown>[]).map(student=>{
        return {
            value: student._id,
            label: student.name
        }
    })
    entity.students = (entity.students as Record<string, unknown>[]).map(student=>student._id as string);
    entity.teachersDefaultValue = (entity.teachers as Record<string, unknown>[]).map(teacher=>{
        return {
            value: teacher._id,
            label: teacher.name
        }
    })
    entity.teachers = (entity.teachers as Record<string, unknown>[]).map(teacher=>teacher._id as string);
    entity.disciplinaDefaultValue = (entity.disciplina as Record<string, unknown>)._id;

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
            hour: startHour,
            startHour,
            endHour,
            ...aula
        } as Record<string, unknown>)
    })

    return entities;
}

export async function getStudents() {
    const suffix = "user/alunas";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { 
        sort: "name",
        order: "asc",
        offset: 0,
        limit: 10000,
        status: "approved"
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

export async function editTurma(body: Record<string, unknown>, entityId: string) {
    const suffix = "turma";
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

export async function getTeachers() {
    const suffix = "user/professoras";
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

export async function getDisciplinas() {
    const suffix = "disciplina";
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

export async function createAula(body: Record<string, unknown>) {
    const suffix = "aula";
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

export async function editAula(body: Record<string, unknown>, entityId: string) {
    const suffix = "aula";
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

export async function deleteAula(entityId: string) {
    const suffix = "aula";
    const method = "delete";
    let success = false;

    const response = await makeConnection({
        suffix,
        method,
        entityId
    });
    success = response ? true : false;

    return success;
}

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
        return ({
            dateShow: material.date ? formatDateToShow(material.date as string).substr(0,10) : "---",
            ...material
        })
    })
    return materiais;
}