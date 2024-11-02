import Student from './Student'
import Subject from './Subject'

export type ClassroomGrade = 1 | 2 | 3

type IClassroomProps = {
    id: string
    name: string
    grade: ClassroomGrade
    students: Student[]
    subjects: Subject[]
}

export default class Classroom implements IClassroomProps {
    public id: string
    public name: string
    public grade: ClassroomGrade
    public students: Student[]
    public subjects: Subject[]

    private constructor({ id, name, grade, students, subjects }: IClassroomProps) {
        this.id = id
        this.name = name
        this.grade = grade
        this.students = students
        this.subjects = subjects
    }

    private createDefaultSubjects() {
        throw new Error("Method not implemented.")
    }

    public static create(name: string, grade: ClassroomGrade) {
        const classroom = new Classroom({
            id: crypto.randomUUID().toString(),
            name,
            grade,
            students: [],
            subjects: []
        })

        classroom.createDefaultSubjects()

        return classroom
    }

    public static with(props: IClassroomProps) {
        return new Classroom(props)
    }
}
