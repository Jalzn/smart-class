import Student from "@/domain/entities/Student"
import { ValidationError } from "@/domain/errors"
import { IStudentRepository } from "@/domain/repositories"



type findByIdStudentsInputDTO = {
    id: string
}

type findByIdStudentsOutputDTO = {
    student: Student
}

export class findByIdStudentsUsecase {
    private studentRepository: IStudentRepository

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository
    }

    async execute({ id}: findByIdStudentsInputDTO): Promise<findByIdStudentsOutputDTO> {
        if (!id) {
            throw new ValidationError("id is missing")
        }
        const student = await this.studentRepository.findById(id)

        return { student }
    }


}