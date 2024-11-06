import { Subject } from "@/domain/entities"
import { ValidationError } from "@/domain/errors"
import { IClassroomRepository, ITeacherRepository } from "@/domain/repositories"
import { SubjectCode } from "@/domain/types"

type AssignTeacherSubjectInputDTO = {
    classroomId: string,
    teacherId: string,
    subjectCode: SubjectCode
}

export class AssignTeacherSubjectUsecase {
    private classroomRepository: IClassroomRepository
    private teacherRepository: ITeacherRepository

    constructor(classroomRepository: IClassroomRepository, teacherRepository: ITeacherRepository) {
        this.classroomRepository = classroomRepository
        this.teacherRepository = teacherRepository
    }

    async execute({ classroomId, teacherId, subjectCode }: AssignTeacherSubjectInputDTO) {
        if (!classroomId) {
            throw new ValidationError("Classroom id is missing.")
        }

        if (!teacherId) {
            throw new ValidationError("Teacher id is missing.")
        }

        if (!subjectCode) {
            throw new ValidationError("Subject code is missing")
        }

        const classroom = await this.classroomRepository.findById(classroomId)
        const teacher = await this.teacherRepository.findById(teacherId)

        const subject = Subject.create(subjectCode)

        classroom.atribuirProfessorMateria(teacher, subject)

        await this.classroomRepository.update(classroom)

        return classroom
    }
}