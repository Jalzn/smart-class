import Subject from "./Subject"

type ITeacherProps = {
    id: string
    name: string
    subjects: Subject[]
}

export default class Teacher {
    public id: string
    public name: string
    public subjects: Subject[]

    private constructor({ id, name, subjects }: ITeacherProps) {
        this.id = id
        this.name = name
        this.subjects = subjects
    }

    public static create(name: string) {
        return new Teacher({
            id: crypto.randomUUID().toString(),
            name: name,
            subjects: []
        })
    }

    public static with(props: ITeacherProps) {
        return new Teacher(props)
    }
}
