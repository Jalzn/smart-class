import { Classroom } from '../entities'

export interface IClassroomRepository {
    findAll: () => Promise<Classroom[]>
    findById: (id: string) => Promise<Classroom>
    create: (classroom: Classroom) => Promise<void>
    update: (classroom: Partial<Classroom>) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
