import { ValidationError } from "@/domain/errors";
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

        await this.teacherRepository.deleteById(teacherId)
    }
}