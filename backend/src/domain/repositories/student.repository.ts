import { Student } from '../entities'

export interface IStudentRepository {
    findAll: () => Promise<Student[]>
    findById: (id: string) => Promise<Student>
    create: (student: Student) => Promise<void>
    update: (student: Student, data: Partial<Student>) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
