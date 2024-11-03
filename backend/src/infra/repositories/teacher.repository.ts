import { Subject, Teacher } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors'
import { ITeacherRepository } from '@/domain/repositories'
import { PrismaClient } from '@prisma/client'

export class TeacherRepository implements ITeacherRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    async findAll(): Promise<Teacher[]> {
        const teachers: Teacher[] = []

        const rows = await this.client.teacher.findMany({
            include: {
                subjects: true
            }
        })

        rows.forEach((row) => {
            const teacher = this.mapSchemaToDomain(row)
            teachers.push(teacher)
        })

        return teachers
    }

    async findById(id: string): Promise<Teacher> {
        const row = await this.client.teacher.findUnique({
            where: { id },
        })

        if (!row) {
            throw new NotFoundError('Teacher not found.')
        }

        return this.mapSchemaToDomain(row)
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

        const subjects = teacher.subjects.map(s => ({
            id: s.id,
            code: s.code,
            name: s.name,
            teacherId: teacher.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }))

        await this.client.subject.createMany({
            data: subjects
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
        await this.client.subject.deleteMany({
            where: {
                teacherId: id
            }
        })

        await this.client.teacher.delete({
            where: { id },
        })
    }

    private mapSchemaToDomain(row: any): Teacher {
        const subjects = row.subjects.map(s => Subject.with(s))

        return Teacher.with({
            id: row.id,
            name: row.name,
            subjects: subjects
        })
    }
}
