import { Student } from '@/domain/entities';
import { IStudentRepository } from "@/domain/repositories"
import { PrismaClient} from '../../../.prisma/client'




export class StudentRepository implements IStudentRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    async findAll() {
        const students = await this.client.student.findMany()

        return students
    }


    async findById(id: string) {
        const student = await this.client.student.findFirstOrThrow({ where: { id } })

        return student
    }

    async update() {

    }

    async deleteById() {

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