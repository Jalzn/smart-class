import Student from "@/domain/entities/Student"
import { ValidationError } from "@/domain/errors"
import { IStudentRepository } from "@/domain/repositories"



type CreateStudentInputDTO = {
    name: string

}
type CreateStudentOutputDTO = {
    student: Student
}

export class CreateStudentUsecase {
    private studentRepository: IStudentRepository

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository
    }

    async execute({ name}: CreateStudentInputDTO): Promise<CreateStudentOutputDTO> {
        if (!name) {
            throw new ValidationError("Name is missing")
        }
        const student = Student.create(name)

        await this.studentRepository.create(student)

        return { student }
    }


}