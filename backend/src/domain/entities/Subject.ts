import { SubjectCode, SubjectName } from '../types'
import Teacher from './Teacher'

type ISubjectProps = {
    id: string
    code: string
    name: string
}

export default class Subject implements ISubjectProps {
    public id: string
    public code: string
    public name: string

    private static subjectMap: Record<SubjectCode, SubjectName> = {
        "PORT": "Lingua Portuguesa",
        "ENGL": "Lingua Inglesa",
        "ART": "Artes",
        "EDF": "Educacao Fisica",
        "MAT": "Matematica",
        "HIS": "Historia",
        "GEO": "Geografia",
        "SOC": "Sociologia",
        "FIL": "Filosofia",
        "FIS": "Fisica",
        "QUI": "Quimica",
        "BIO": "Biologia"
    }

    private constructor({ id, code, name }: ISubjectProps) {
        this.id = id
        this.code = code
        this.name = name
    }

    private static getSubjectNameByCode(code: SubjectCode): SubjectName {
        return Subject.subjectMap[code]
    }

    public static create(code: SubjectCode, teacher: Teacher) {
        const name = Subject.getSubjectNameByCode(code)

        return new Subject({
            id: crypto.randomUUID().toString(),
            code,
            name,
        })
    }

    public static with(props: ISubjectProps) {
        return new Subject(props)
    }
}
