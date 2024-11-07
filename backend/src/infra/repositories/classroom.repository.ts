import { Classroom, Subject, Teacher } from "@/domain/entities";
import { ClassroomGrade } from "@/domain/entities/Classroom";
import Horario from "@/domain/entities/Horario";
import { IClassroomRepository } from "@/domain/repositories";
import { SubjectCode } from "@/domain/types";
import { PrismaClient } from "@prisma/client";


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
                quadroTeacherSubject: [],
                horarios: []
            })

            classrooms.push(classroom)
        })

        for (let i = 0; i < classrooms.length; i++) {
            classrooms[i] = await this.populateQuadroTeacherSubject(classrooms[i])
            classrooms[i] = await this.populateHorarios(classrooms[i])
        }

        return classrooms
    }

    async findById(id: string) {
        const schema = await this.client.classroom.findFirstOrThrow({ where: { id } })

        let classroom = Classroom.with({
            ...schema,
            students: [],
            grade: schema.grade as ClassroomGrade,
            quadroTeacherSubject: [],
            horarios: []
        })

        classroom = await this.populateQuadroTeacherSubject(classroom)
        classroom = await this.populateHorarios(classroom)

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

        if (classroom.horarios) {
            classroom.horarios.forEach(async (horario) => {
                const hasHorarios = await this.client.classroomHorario.findFirst({
                    where: { classroomId: classroom.id ?? "" }
                })

                if (hasHorarios) {
                    await this.client.classroomHorario.deleteMany({
                        where: { classroomId: classroom.id ?? "" }
                    })
                }

                await this.client.classroomHorario.create({
                    data: {
                        classroomId: classroom.id ?? "",
                        subjectCode: horario.subjectCode as string,
                        dayInWeek: horario.dayInWeek,
                        hour: horario.hour
                    }
                })
            })
        }

        await this.client.classroom.update({
            where: { id: classroom.id },
            data: {
                name: classroom.name
            }
        })
    }

    async deleteById(id: string) {
        await this.client.classroomQuadroTeacherMateria.deleteMany({
            where: {
                classroomId: id
            }
        })

        await this.client.classroom.delete({
            where: { id }
        })
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
                const row = await this.client.teacher.findUniqueOrThrow({ where: { id: quadroTeacherSubject[j].teacherId || '' } })

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

    private async populateHorarios(classroom: Classroom) {
        const horarioSchemas = await this.client.classroomHorario.findMany({
            where: {
                classroomId: classroom.id
            }
        })

        const horarios: Horario[] = horarioSchemas.map(horario => {
            return Horario.create(horario.subjectCode as SubjectCode, horario.dayInWeek, horario.hour)
        })

        horarios.sort((h1, h2) => {
            if (h1.dayInWeek < h2.dayInWeek) {
                return -1
            }
            else if (h1.dayInWeek > h2.dayInWeek) {
                return 1
            }
            else {
                if (h1.hour < h2.hour) {
                    return -1
                }
                if (h1.hour > h2.hour) {
                    return 1
                }
                else {
                    return 0
                }
            }
        })

        classroom.horarios = horarios
        return classroom
    }
}