import { ValidationError } from '../errors'
import { SubjectCode } from '../types'
import Horario from './Horario'
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

    // Representa os horarios de aula
    horarios: Horario[]
}

export default class Classroom implements IClassroomProps {
    public id: string
    public name: string
    public grade: ClassroomGrade
    public students: Student[]
    public quadroTeacherSubject: Array<[Teacher | null, Subject]>
    public horarios

    private constructor({ id, name, grade, students, quadroTeacherSubject, horarios }: IClassroomProps) {
        this.id = id
        this.name = name
        this.grade = grade
        this.students = students
        this.quadroTeacherSubject = quadroTeacherSubject
        this.horarios = horarios
    }

    public atribuirProfessorMateria(teacher: Teacher, subject: Subject) {
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

    public gerarDummyHorarios() {
        const horarios: Horario[] = []

        const availableSubjects = this.quadroTeacherSubject.map(quadro => quadro[1])

        let daysInWeek = [0, 1, 2, 3, 4]
        daysInWeek.sort(() => Math.random() - 0.5)

        daysInWeek.forEach(dayInWeek => {
            let hours = [0, 1, 2, 3, 4]
            hours.sort(() => Math.random() - 0.5)

            hours.forEach(hour => {
                const random = Math.floor(Math.random() * availableSubjects.length);
                const subject = availableSubjects[random]

                if (!subject) { return }

                let horario = Horario.create(
                    subject.code as SubjectCode,
                    dayInWeek,
                    hour
                )

                horarios.push(horario)
            })
        })

        horarios.sort((h1, h2) => {
            if (h1.dayInWeek < h2.dayInWeek) {
                return -1
            }
            else if (h1.dayInWeek > h2.dayInWeek) {
                return 1
            }
            else {
                if (h1.hour < h2.hour) {
                    return -1
                }
                if (h1.hour > h2.hour) {
                    return 1
                }
                else {
                    return 0
                }
            }
        })

        this.horarios = horarios
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
            quadroTeacherSubject: quadroTeacherSubject,
            horarios: []
        })

        return classroom
    }

    public static with(props: IClassroomProps) {
        return new Classroom(props)
    }
}
