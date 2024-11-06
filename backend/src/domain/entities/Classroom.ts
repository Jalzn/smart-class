import { ValidationError } from '../errors'
import { SubjectCode } from '../types'
import Student from './Student'
import Subject from './Subject'
import Teacher from './Teacher'

export type ClassroomGrade = 1 | 2 | 3

type IClassroomProps = {
    id: string
    name: string
    grade: ClassroomGrade
    students: Student[]

    // Representa qual materia cada
    // professor e responsavel na sala
    quadroTeacherSubject: Array<[Teacher | null, Subject]>
}

export default class Classroom implements IClassroomProps {
    public id: string
    public name: string
    public grade: ClassroomGrade
    public students: Student[]
    public quadroTeacherSubject: Array<[Teacher | null, Subject]>

    private constructor({ id, name, grade, students, quadroTeacherSubject }: IClassroomProps) {
        this.id = id
        this.name = name
        this.grade = grade
        this.students = students
        this.quadroTeacherSubject = quadroTeacherSubject
    }

    public atribuirProfessorMateria(teacher: Teacher, subject: Subject) {
        console.log(teacher, subject)
        const isValidSubject = teacher.subjects.find(s => subject.code === s.code)

        if (!isValidSubject) {
            throw new ValidationError("Teacher cannot teach this subject.")
        }

        const i = this.quadroTeacherSubject.findIndex(quadro => quadro[1] == subject)

        if (i === -1) {
            this.quadroTeacherSubject.push([teacher, subject])
            return
        }

        this.quadroTeacherSubject[i] = [teacher, subject]
    }

    public static create(name: string, grade: ClassroomGrade) {
        const quadroTeacherSubject: Array<[Teacher | null, Subject]> = []

        Object.entries(Subject.getDefaultSubjects()).forEach(([code, name]) => {
            quadroTeacherSubject.push([
                null,
                Subject.create(code as SubjectCode)
            ])
        })

        const classroom = new Classroom({
            id: crypto.randomUUID().toString(),
            name,
            grade,
            students: [],
            quadroTeacherSubject: quadroTeacherSubject
        })

        return classroom
    }

    public static with(props: IClassroomProps) {
        return new Classroom(props)
    }
}
