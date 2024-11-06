import { School } from '../entities'

export interface ISchoolRepository {
    findById: (id: string) => Promise<School>
    create: (school: School) => Promise<void>
    update: (school: School, data: Partial<School>) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
