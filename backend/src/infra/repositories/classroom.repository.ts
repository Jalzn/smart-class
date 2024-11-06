import { Classroom, Subject, Teacher } from "@/domain/entities";
import { ClassroomGrade } from "@/domain/entities/Classroom";
import { IClassroomRepository } from "@/domain/repositories";
import { SubjectCode } from "@/domain/types";
import { PrismaClient} from '../../../.prisma/client';


export class ClassroomRepository implements IClassroomRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    async findAll() {
        // eslint-disable-next-line prefer-const
        let classrooms: Classroom[] = []

        const classroomSchemas = await this.client.classroom.findMany()

        classroomSchemas.forEach(schema => {
            const classroom = Classroom.with({
                ...schema,
                students: [],
                grade: schema.grade as ClassroomGrade,
                quadroTeacherSubject: []
            })

            classrooms.push(classroom)
        })

        for (let i = 0; i < classrooms.length; i++) {
            classrooms[i] = await this.populateQuadroTeacherSubject(classrooms[i])
        }

        return classrooms
    }

    async findById(id: string) {
        const schema = await this.client.classroom.findFirstOrThrow({ where: { id } })

        let classroom = Classroom.with({
            ...schema,
            students: [],
            grade: schema.grade as ClassroomGrade,
            quadroTeacherSubject: []
        })

        classroom = await this.populateQuadroTeacherSubject(classroom)

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

        await this.client.classroomQuadroTeacherMateria.createMany({
            data: classroom.quadroTeacherSubject.map(q => ({
                classroomId: classroom.id,
                teacherId: q[0]?.id,
                subjectCode: q[1].code,
            }))
        })
    };

    async update(classroom: Partial<Classroom>) {
        if (classroom.quadroTeacherSubject) {
            classroom.quadroTeacherSubject.forEach(async (quadro) => {
                if (quadro[0]) {
                    await this.client.classroomQuadroTeacherMateria.updateMany({
                        where: {
                            classroomId: classroom.id,
                            subjectCode: quadro[1].code,
                        },
                        data: {
                            teacherId: quadro[0].id
                        }
                    })
                }
            })
        }

        await this.client.classroom.update({
            where: { id: classroom.id },
            data: {
                name: classroom.name
            }
        })
    }

    async deleteById() {

    }

    private mapSchemaToDomain(row: any): Classroom {
        const classroom = Classroom.with(row)

        return classroom
    }

    private async populateQuadroTeacherSubject(classroom: Classroom) {
        const quadroTeacherSubject = await this.client.classroomQuadroTeacherMateria.findMany({
            where: {
                classroomId: classroom.id
            }
        })

        for (let j = 0; j < quadroTeacherSubject.length; j++) {
            let t: Teacher | null = null

            if (quadroTeacherSubject[j].teacherId) {
                const row = await this.client.teacher.findUniqueOrThrow({ where: { id: quadroTeacherSubject[j].teacherId || ''} })

                t = Teacher.with({
                    id: row.id,
                    name: row.name,
                    subjects: []
                })
            }

            const s = Subject.create(quadroTeacherSubject[j].subjectCode as SubjectCode)

            classroom.quadroTeacherSubject.push([t, s])
        }

        return classroom
    }
}