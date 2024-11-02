import Teacher from './Teacher'

type ISubjectProps = {
    id: string
    code: string
    name: string
    teacher: Teacher
}

export default class Subject implements ISubjectProps {
    public id: string
    public code: string
    public name: string
    public teacher: Teacher

    private constructor({ id, code, name, teacher }: ISubjectProps) {
        this.id = id
        this.code = code
        this.name = name
        this.teacher = teacher
    }

    public static create(code: string, name: string, teacher: Teacher) {
        return new Subject({
            id: crypto.randomUUID().toString(),
            code,
            name,
            teacher,
        })
    }

    public static with(props: ISubjectProps) {
        return new Subject(props)
    }
}
