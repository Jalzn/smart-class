import { Teacher } from '../entities'

export interface ITeacherRepository {
    findAll: () => Promise<Teacher[]>
    findById: (id: string) => Promise<Teacher>
    create: (teacher: Teacher) => Promise<void>
    update: (teacher: Teacher, data: Partial<Teacher>) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
