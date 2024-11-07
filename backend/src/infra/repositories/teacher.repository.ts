import { Subject, Teacher } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors'
import { ITeacherRepository } from '@/domain/repositories'
import { SubjectCode } from '@/domain/types'
import { PrismaClient } from '../../../.prisma/client'

export class TeacherRepository implements ITeacherRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    async findAll(): Promise<Teacher[]> {
        const teachers: Teacher[] = []

        const teacherSchemas = await this.client.teacher.findMany()

        teacherSchemas.forEach((schema) => {
            const teacher = this.mapSchemaToDomain(schema)
            teachers.push(teacher)
        })

        for (let i = 0; i < teachers.length; i++) {
            await this.populateSubjects(teachers[i])
        }

        return teachers
    }

    async findById(id: string): Promise<Teacher> {
        const row = await this.client.teacher.findUnique({
            where: { id },
        })

        if (!row) {
            throw new NotFoundError('Teacher not found.')
        }

        const teacher = this.mapSchemaToDomain(row)

        await this.populateSubjects(teacher)

        return teacher
    }

    async create(teacher: Teacher): Promise<void> {
        await this.client.teacher.create({
            data: {
                id: teacher.id,
                name: teacher.name,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        await this.client.teacherSubject.createMany({
            data: teacher.subjects.map(s => ({
                teacherId: teacher.id,
                subjectCode: s.code
            }))
        })
    }

    async update(teacher: Teacher, data: Partial<Teacher>): Promise<void> {
        await this.client.teacher.update({
            where: {
                id: teacher.id,
            },
            data,
        })
    }

    async deleteById(id: string): Promise<void> {
        await this.client.classroomQuadroTeacherMateria.updateMany({
            where: {
                teacherId: id
            },
            data: {
                teacherId: null
            }
        })

        await this.client.teacherSubject.deleteMany({
            where: {
                teacherId: id
            }
        })

        await this.client.teacher.delete({
            where: { id },
        })
    }

    private mapSchemaToDomain(row: any): Teacher {
        return Teacher.with({
            id: row.id,
            name: row.name,
            subjects: []
        })
    }

    private async populateSubjects(teacher: Teacher) {
        const teacherSubjectSchemas = await this.client.teacherSubject.findMany({
            where: {
                teacherId: teacher.id
            }
        })

        teacherSubjectSchemas.forEach(({ subjectCode }) => {
            teacher.subjects.push(Subject.create(subjectCode as SubjectCode))
        })

        return teacher
    }
}
