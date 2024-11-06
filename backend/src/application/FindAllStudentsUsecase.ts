import { Student } from "@/domain/entities";
import { IStudentRepository } from "@/domain/repositories";

type FindAllStudentsOutputDTO = {
    students: Student[]
}

export default class FindAllStudentsUsecase {
    private studentRepository: IStudentRepository

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository
    }

    async execute(): Promise<FindAllStudentsOutputDTO> {
        const students = await this.studentRepository.findAll()

        return { students }
    }
}