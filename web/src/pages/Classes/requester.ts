import { makeConnection } from "../../Tools/makeConnection"

interface IResult {
    data: Record<string, unknown>[];
    total: number;
}

function _formatEntities(entity: Record<string, unknown>) {
    let studentsDefaultValue: Record<string, unknown>[] = [];
    let students: string[] = [];
    let teachersDefaultValue: Record<string, unknown>[] = [];
    let teachers: string[] = [];

    (entity.teachers as Record<string, unknown>[]).forEach(teacher=>{
        teachersDefaultValue.push({
            label: teacher.name,
            value: teacher._id,
        })
        teachers.push(teacher._id as string)
    });
    (entity.students as Record<string, unknown>[]).forEach(student=>{
        studentsDefaultValue.push({
            label: student.name,
            value: student._id,
        })
        students.push(student._id as string)
    });

    entity.teachersDefaultValue = teachersDefaultValue;
    entity.studentsDefaultValue = studentsDefaultValue;
    entity.students = students;
    entity.teachers = teachers;
    entity.disciplinaDefaultValue = (entity.disciplina as Record<string, unknown>)._id;

    const formatedEntity = {
        icon: (entity.disciplina as Record<string, unknown>).icon,
        studentsCount: `${(entity.students as Record<string, unknown>[]).length} alunas`,
        aulasCount: `${(entity.aulas as Record<string, unknown>[]).length} aulas cadastradas`,
        ...entity
    }

    return formatedEntity;
}

export async function getEntities(offset: number, filters?: Record<string, unknown>) {
    const suffix = "turma";
    const method = "get";
    const otherQueryStrings: Record<string, unknown> = { offset };
    let result: IResult = {
        data: [],
        total: 1,
    };

    if(filters) {
        Object.keys(filters).forEach((key)=>{
            if(filters[key] && filters[key] !== "") {
                otherQueryStrings[key] = filters[key];
            }
        })
    }

    const user = JSON.parse(localStorage.getItem("user") as string);

    if(user.role === "teacher") {
        otherQueryStrings.userId = user._id;
    }

    const response = await makeConnection({
        suffix,
        method,
        otherQueryStrings
    });
    const entities = (response?.data.data as Record<string, unknown>[]).map((entity)=>{
        return _formatEntities(entity);
    })

    result = {
        data: entities,
        total: response?.data.total
    }

    return result;
}

export async function createEntity(body: Record<string, unknown>) {
    const suffix = "turma";
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

export async function editEntity(body: Record<string, unknown>, entityId: string) {
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

export async function deleteEntity(entityId: string) {
    const suffix = "turma";
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

export async function finalizarTurma(entityId: string) {
    const suffix = "turma/finalizar";
    const method = "post";
    let success = false;

    const response = await makeConnection({
        suffix,
        method,
        entityId
    });
    success = response ? true : false;

    return success;
}