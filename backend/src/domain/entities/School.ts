import { ValidationError } from '../errors'
import Classroom from './Classroom'
import Student from './Student'
import Teacher from './Teacher'

export default class School {
    private teachers: Teacher[]
    private students: Student[]
    private classrooms: Classroom[]

    constructor() {
        this.teachers = []
        this.students = []
        this.classrooms = []
    }

    registerTeacher(teacher: Teacher) {
        if (this.teachers.find((t) => teacher.id === t.id)) {
            throw new ValidationError('Teacher already in school.')
        }

        this.teachers.push(teacher)
    }

    registerStudent(student: Student) {
        if (this.students.find((s) => student.id === s.id)) {
            throw new ValidationError('Student already in school.')
        }

        this.students.push(student)
    }

    registerClassroom(classroom: Classroom) {
        if (this.classrooms.find((c) => classroom.id === c.id)) {
            throw new ValidationError('Classroom already exists in school.')
        }

        this.classrooms.push(classroom)
    }
}
