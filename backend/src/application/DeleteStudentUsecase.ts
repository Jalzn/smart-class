import { ValidationError } from "@/domain/errors";
import { IStudentRepository } from "@/domain/repositories";

type deleteStudentInputDTO = {
    id: string
}

export class deleteStudentUsecase {
    private StudentRepository: IStudentRepository

    constructor(StudentRepository: IStudentRepository) {
        this.StudentRepository = StudentRepository
    }

    async execute({id}: deleteStudentInputDTO) {
        if (!id) {
            throw new ValidationError("Students id is missing.")
        }

        await this.StudentRepository.deleteById(id)
    }
}