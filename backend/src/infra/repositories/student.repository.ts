import { Student } from '@/domain/entities';
import { IStudentRepository } from "@/domain/repositories"
import { PrismaClient } from "@prisma/client"


export class StudentRepository implements IStudentRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }


    async findById(id: string) {
        const student = await this.client.student.findFirstOrThrow({ 
            where: { id },
        })

        return student
    }
    
    async update() {

    }

    async deleteById(id: string) {

        await this.client.student.delete({
            where: { id },
        })
    }



    async create(student: Student) {
        await this.client.student.create({
            data: {
                id: student.id,
                name: student.name,
                createdAt: new Date(),
                updatedAt: new Date()

            }
        })
    };

}