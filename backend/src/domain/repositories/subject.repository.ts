import { Subject } from '../entities'

export interface ISubjectRepository {
    findById: (id: string) => Promise<Subject>
    create: (subject: Subject) => Promise<void>
    update: (subject: Subject, data: Partial<Subject>) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
