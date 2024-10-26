import { Teacher } from '@/domain/entities'
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

        const rows = await this.client.teacher.findMany()

        rows.forEach((row) => {
            teachers.push(Teacher.with(row))
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

        return Teacher.with(row)
    }

    async create(teacher: Teacher): Promise<void> {
        await this.client.teacher.create({
            data: {
                id: teacher.id,
                userId: teacher.user!.id,
                name: teacher.name,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
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
        await this.client.teacher.delete({
            where: { id },
        })
    }
}
