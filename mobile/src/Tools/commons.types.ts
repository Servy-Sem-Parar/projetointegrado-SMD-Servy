export type UserInfo = {
    _id: string,
    name: string,
    turmas: TurmaInfo[]
}

export type TurmaInfo = {
    _id: string,
    name: string,
    color: string,
    disciplina: {
        icon: string,
    },
    teachers: UserInfo[]
}

export type AulaInfo = {
    _id: string,
    date: Date,
    title: string,
    duration: number,
    link: string,
    turma: {
        name: string,
        color: string,
    }
}

export type MaterialInfo = {
    _id: string,
    date: Date,
    name: string,
    link: string,
}