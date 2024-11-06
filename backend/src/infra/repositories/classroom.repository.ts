import { Classroom } from "@/domain/entities";
import { ClassroomGrade } from "@/domain/entities/Classroom";
import { IClassroomRepository } from "@/domain/repositories";
import { PrismaClient } from '@prisma/client'


export class ClassroomRepository implements IClassroomRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    async findAll() {
        // eslint-disable-next-line prefer-const
        let classrooms: Classroom[] = []

        const rows = await this.client.classroom.findMany({
            include: {
                subjects: true,
            }
        })

        rows.forEach(row => {
            const classroom = Classroom.with({
                ...row,
                students: [],
                grade: row.grade as ClassroomGrade
            })

            classrooms.push(classroom)
        })

        return classrooms
    }

    async findById(id: string) {
        const row = await this.client.classroom.findFirstOrThrow({ where: { id } })

        const classroom = this.mapSchemaToDomain(row)

        return classroom
    }

    async create(classroom: Classroom) {
        await this.client.classroom.create({
            data: {
                id: classroom.id,
                name: classroom.name,
                grade: classroom.grade,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    };

    async update() {

    }

    async deleteById() {

    }

    private mapSchemaToDomain(row: any): Classroom {
        const classroom = Classroom.with(row)

        return classroom
    }
}