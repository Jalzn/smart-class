import { School } from '@/domain/entities';
import { NotFoundError } from '@/domain/errors';
import { ISchoolRepository } from "@/domain/repositories"
import { PrismaClient } from "@prisma/client"


export class SchoolRepository implements ISchoolRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }
    
   
    async update() {

    }

    async findById (id: string) {
        const row = await this.client.school.findUnique({
            where: { id },
            include: { // Include related data
                teachers: true,  // Correct relationships
                students: true,
                classrooms: true,
            },
        })

        if (!row) {
            throw new NotFoundError('Teacher not found.')
        }

        return row as unknown as School;
    };



    async deleteById(id: string) {
        await this.client.teacher.deleteMany({
            where: {
                schoolId: id
            }
        })
        await this.client.student.deleteMany({
            where: {
                schoolId: id
            }
        })
        await this.client.classroom.deleteMany({
            where: {
                schoolId: id
            }
        })


        await this.client.school.delete({
            where: { id },
        })
    }



    async create(School: School) {
        await this.client.school.create({
            data: {
                id: School.id,
                createdAt: new Date(),
                updatedAt: new Date()

            }
        })
    };




}