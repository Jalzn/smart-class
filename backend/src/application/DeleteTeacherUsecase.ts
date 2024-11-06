import { NotFoundError, ValidationError } from "@/domain/errors";
import { ITeacherRepository } from "@/domain/repositories";

export class DeleteTeacherUsecase {
    private teacherRepository: ITeacherRepository

    constructor(teacherRepository: ITeacherRepository) {
        this.teacherRepository = teacherRepository
    }

    async execute(teacherId: string) {
        if (!teacherId) {
            throw new ValidationError("Teachers id is missing.")
        }

        const teacher = this.teacherRepository.findById(teacherId)

        if (!teacher) {
            throw new NotFoundError("Teacher not found.")
        }

        await this.teacherRepository.deleteById(teacherId)
    }
}