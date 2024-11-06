import { ValidationError } from "@/domain/errors";
import { IStudentRepository } from "@/domain/repositories";

export class deleteStudentUsecase {
    private StudentRepository: IStudentRepository

    constructor(StudentRepository: IStudentRepository) {
        this.StudentRepository = StudentRepository
    }

    async execute(StudentId: string) {
        if (!StudentId) {
            throw new ValidationError("Students id is missing.")
        }

        await this.StudentRepository.deleteById(StudentId)
    }
}