import { Classroom, School } from '../entities'

export interface IClassroomRepository {
    create: (school: School, classroom: Classroom) => Promise<void>
    update: (classroom: Classroom) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
