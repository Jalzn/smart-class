import { SubjectCode, SubjectName } from '../types'

type ISubjectProps = {
    code: string
    name: string
}

export default class Subject implements ISubjectProps {
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

    private constructor({ code, name }: ISubjectProps) {
        this.code = code
        this.name = name
    }

    static getDefaultSubjects() {
        return this.subjectMap
    }

    private static getSubjectNameByCode(code: SubjectCode): SubjectName {
        return Subject.subjectMap[code]
    }

    public static create(code: SubjectCode) {
        const name = Subject.getSubjectNameByCode(code)

        return new Subject({
            code,
            name,
        })
    }

    public static with(props: ISubjectProps) {
        return new Subject(props)
    }
}
