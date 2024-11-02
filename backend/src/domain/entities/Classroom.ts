import Student from './Student'

export type ClassroomGrade = 1 | 2 | 3

type IClassroomProps = {
    id: string
    name: string
    grade: ClassroomGrade
    students: Student[]
}

export default class Classroom implements IClassroomProps {
    public id: string
    public name: string
    public grade: ClassroomGrade
    public students: Student[]

    private constructor({ id, name, grade, students }: IClassroomProps) {
        this.id = id
        this.name = name
        this.grade = grade
        this.students = students
    }

    public static create(name: string, grade: ClassroomGrade) {
        return new Classroom({
            id: crypto.randomUUID().toString(),
            name,
            grade,
            students: [],
        })
    }

    public static with(props: IClassroomProps) {
        return new Classroom(props)
    }
}
